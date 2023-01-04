import { GraphQLError } from "graphql";
import { ActionType } from "../../../types/graphql.js";
import { SubscriptionData, SUBSCRIPTIONS } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";

export const createConversation: MutationResolvers["createConversation"] = async (
  _,
  { userIds },
  { prisma, session, pubsub }
) => {
  if (!session?.user?.id) throw new GraphQLError("Unauthorized");
  const { id: userId } = session.user;

  const participants = userIds.filter((id) => id !== userId);

  if (userId) participants.unshift(userId);

  const size = new Set(participants);

  if (size.size < 2 || size.size !== participants.length) throw new GraphQLError("Invalid userids arguments");

  try {
    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          createMany: {
            data: participants.map((id) => ({ userId: id, hasSeenLatestMessage: id === userId })),
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
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
