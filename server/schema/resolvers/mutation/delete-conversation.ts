import { GraphQLError } from "graphql";
import { ActionType } from "../../../types/graphql.js";
import { SubscriptionData, SUBSCRIPTIONS } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";

export const deleteConversation: MutationResolvers["deleteConversation"] = async (
  _,
  { conversationId },
  { session, prisma, pubsub }
) => {
  if (!session?.user?.id) throw new GraphQLError("Unauthorized");

  try {
    const { id: userId } = session.user;
    const conversation = await prisma.conversation.findFirstOrThrow({
      where: { id: conversationId, participants: { some: { userId: { equals: userId } } } },
      include: populateConversation,
    });

    await prisma.$transaction([
      prisma.conversation.delete({
        where: { id: conversation.id },
      }),
      prisma.conversationParticipant.deleteMany({
        where: { conversationId: conversation.id },
      }),
      prisma.message.deleteMany({
        where: { conversationId: conversation.id },
      }),
    ]);

    const subscriptionData: SubscriptionData["conversationUpdated"] = {
      onConversationUpdated: {
        conversation,
        senderId: userId,
        actionType: ActionType.Deleted,
      },
    };

    pubsub.publish(SUBSCRIPTIONS.CONVERSATION_UPDATED, subscriptionData).catch(console.error);

    return true;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
