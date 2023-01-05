import { withFilter } from "graphql-subscriptions";
import { Message, SubscriptionOnMessageSentArgs } from "../../../types/graphql.js";
import { SUBSCRIPTIONS, Resolver } from "../../../utils/subscriptions.js";
import { populateConversation } from "../query/conversations.js";

interface OnMessageSent {
  onMessageSent: Message;
}

const asyncIteratorFn: Resolver<OnMessageSent, {}, AsyncIterator<any>> = (_, _args, { pubsub }) => {
  const asyncIterator = pubsub.asyncIterator(SUBSCRIPTIONS.MESSAGE_SENT);
  return asyncIterator;
};

const filterFn: Resolver<OnMessageSent, SubscriptionOnMessageSentArgs, Promise<boolean>> = async (
  { onMessageSent },
  { conversationId },
  { session, prisma }: UnsafeContext
) => {
  const isUserParticipatingInConversation = async () => {
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: populateConversation,
      });

      return conversation?.participants.findIndex((participant) => participant.user.id === session?.user?.id) !== -1;
    } catch {
      return false;
    }
  };

  return onMessageSent.conversationId === conversationId && (await isUserParticipatingInConversation());
};

export const onMessageSent: SubscriptionResolvers["onMessageSent"] = {
  subscribe: withFilter(asyncIteratorFn, filterFn) as any,
};
