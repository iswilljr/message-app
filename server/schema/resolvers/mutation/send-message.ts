import { GraphQLError } from "graphql";
import { ActionType } from "../../../types/graphql.js";
import { logger } from "../../../utils/logger.js";
import { SUBSCRIPTIONS, type SubscriptionData } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";
import { populateMessage } from "../query/messages.js";

export const sendMessage: MutationResolvers["sendMessage"] = async (
  _,
  { conversationId, node },
  { session, prisma, pubsub }
) => {
  const { id: userId } = session.user;

  const [message, participant] = await prisma.$transaction([
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
          where: { conversationId, NOT: { id: participant.id } },
          data: { hasSeenLatestMessage: false },
        },
      },
    },
    include: populateConversation,
  });

  const conversationUpdatedSubscriptionData: SubscriptionData["conversationUpdated"] = {
    onConversationUpdated: {
      conversation,
      senderId: userId,
      actionType: ActionType.Updated,
    },
  };

  const messageSentSubscriptionData: SubscriptionData["messageSent"] = {
    onMessageSent: message,
  };

  Promise.all([
    pubsub.publish(SUBSCRIPTIONS.MESSAGE_SENT, messageSentSubscriptionData),
    pubsub.publish(SUBSCRIPTIONS.CONVERSATION_UPDATED, conversationUpdatedSubscriptionData),
  ]).catch((err) => logger.error(err.message));

  return true;
};
