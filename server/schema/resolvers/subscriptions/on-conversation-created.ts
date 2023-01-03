import { withFilter } from "graphql-subscriptions";
import { Conversation } from "../../../types/graphql.js";
import { SUBSCRIPTIONS, Resolver } from "../../../utils/subscriptions.js";

interface OnConversationCreated {
  onConversationCreated: Conversation;
}

const asyncIteratorFn: Resolver<OnConversationCreated, {}, AsyncIterator<any>> = (_, _args, { pubsub }) => {
  const asyncIterator = pubsub.asyncIterator(SUBSCRIPTIONS.CONVERSATION_CREATED);
  return asyncIterator;
};

const filterFn: Resolver<OnConversationCreated, {}, boolean> = (payload, _args, { pubsub, session }) => {
  const isParticipant = payload.onConversationCreated.participants.findIndex(
    (participant) => participant.user.id === session?.user?.id
  );

  return isParticipant !== -1;
};

export const onConversationCreated: SubscriptionResolvers["onConversationCreated"] = {
  subscribe: withFilter(asyncIteratorFn, filterFn) as any,
};
