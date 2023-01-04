import { withFilter } from "graphql-subscriptions";
import { OnConversationUpdatedPayload } from "../../../types/graphql.js";
import { SUBSCRIPTIONS, Resolver } from "../../../utils/subscriptions.js";

interface OnConversationUpdated {
  onConversationUpdated: OnConversationUpdatedPayload;
}

const asyncIteratorFn: Resolver<OnConversationUpdated, {}, AsyncIterator<any>> = (_, _args, { pubsub }) => {
  const asyncIterator = pubsub.asyncIterator(SUBSCRIPTIONS.CONVERSATION_UPDATED);
  return asyncIterator;
};

const filterFn: Resolver<OnConversationUpdated, {}, boolean> = (payload, _args, { pubsub, session }) => {
  const isParticipant = payload.onConversationUpdated.conversation.participants.findIndex(
    (participant) => participant.user.id === session?.user?.id
  );

  return isParticipant !== -1;
};

export const onConversationUpdated: SubscriptionResolvers["onConversationUpdated"] = {
  subscribe: withFilter(asyncIteratorFn, filterFn) as any,
};
