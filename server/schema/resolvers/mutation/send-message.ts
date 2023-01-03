import { GraphQLError } from "graphql";
import { SUBSCRIPTIONS } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";
import { populateMessage } from "../query/messages.js";

export const sendMessage: MutationResolvers["sendMessage"] = async (
  _,
  { conversationId, node },
  { session, prisma, pubsub }
) => {
  if (!session?.user?.id) throw new GraphQLError("Unauthorized");

  try {
    const { id: userId } = session.user;

    const [message, participant] = await Promise.all([
      prisma.message.create({
        data: { conversationId, senderId: userId, node },
        include: populateMessage,
      }),
      prisma.conversationParticipant.findFirst({
        where: { userId, conversationId },
      }),
    ]);

    if (!participant) {
      throw new GraphQLError("Participant not found");
    }

    const conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        latestMessageId: message.id,
        participants: {
          update: {
            where: { id: participant.id },
            data: { hasSeenLatestMessage: true },
          },
          updateMany: {
            where: { NOT: { id: participant.id } },
            data: { hasSeenLatestMessage: false },
          },
        },
      },
      include: populateConversation,
    });

    pubsub.publish(SUBSCRIPTIONS.MESSAGE_SENT, { onMessageSent: message });
    pubsub.publish(SUBSCRIPTIONS.CONVERSATION_UPDATED, { onConversationUpdated: conversation });

    return true;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
