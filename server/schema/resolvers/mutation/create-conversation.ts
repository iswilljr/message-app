import { GraphQLError } from "graphql";
import { ActionType } from "../../../types/graphql.js";
import { SubscriptionData, SUBSCRIPTIONS } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";

export const createConversation: MutationResolvers["createConversation"] = async (
  _,
  { userId },
  { prisma, session, pubsub }
) => {
  const { id: sessionId } = session.user;

  if (userId === sessionId) throw new GraphQLError("Cannot create a conversation with yourself");

  const conversation = await prisma.conversation.create({
    data: {
      participants: {
        createMany: {
          data: [sessionId, userId].map((id) => ({ userId: id, hasSeenLatestMessage: id === sessionId })),
        },
      },
    },
    include: populateConversation,
  });

  const subscriptionData: SubscriptionData["conversationUpdated"] = {
    onConversationUpdated: {
      conversation,
      senderId: session.user.id,
      actionType: ActionType.Created,
    },
  };

  await pubsub.publish(SUBSCRIPTIONS.CONVERSATION_UPDATED, subscriptionData);

  return { conversationId: conversation.id };
};
