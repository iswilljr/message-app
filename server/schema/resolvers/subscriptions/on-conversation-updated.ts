import { withFilter } from "graphql-subscriptions";
import type { OnConversationUpdatedPayload } from "../../../types/graphql.js";
import { type Resolver, SUBSCRIPTIONS } from "../../../utils/subscriptions.js";

interface OnConversationUpdated {
  onConversationUpdated: OnConversationUpdatedPayload;
}

const asyncIteratorFn: Resolver<OnConversationUpdated, any, AsyncIterator<any>> = (_, _args, { pubsub }) => {
  const asyncIterator = pubsub.asyncIterator(SUBSCRIPTIONS.CONVERSATION_UPDATED);
  return asyncIterator;
};

const filterFn: Resolver<OnConversationUpdated, any, boolean> = (
  payload,
  _args,
  { pubsub, session }: UnsafeContext
) => {
  const isParticipant = payload.onConversationUpdated.conversation.participants.findIndex(
    (participant) => participant.user.id === session?.user?.id
  );

  return isParticipant !== -1;
};

export const onConversationUpdated: SubscriptionResolvers["onConversationUpdated"] = {
  subscribe: withFilter(asyncIteratorFn, filterFn) as any,
};
