import { ActionType } from "../../../types/graphql.js";
import { logger } from "../../../utils/logger.js";
import { SUBSCRIPTIONS, SubscriptionData } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";

export const deleteConversation: MutationResolvers["deleteConversation"] = async (
  _,
  { conversationId },
  { session, prisma, pubsub }
) => {
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

  pubsub.publish(SUBSCRIPTIONS.CONVERSATION_UPDATED, subscriptionData).catch((err) => logger.error(err.message));

  return true;
};
