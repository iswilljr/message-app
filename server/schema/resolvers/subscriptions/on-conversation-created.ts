import { withFilter } from "graphql-subscriptions";
import { Conversation } from "../../../types/graphql.js";

interface OnConversationCreated {
  onConversationCreated: Conversation;
}

type Resolver<T> = (payload: OnConversationCreated, args: {}, context: Context) => T;

const asyncIteratorFn: Resolver<AsyncIterator<any>> = (_, _args, { pubsub }) => {
  const asyncIterator = pubsub.asyncIterator("CONVERSATION_CREATED");
  return asyncIterator;
};

const filterFn: Resolver<boolean> = (payload, _args, { pubsub, session }) => {
  const isParticipant = payload.onConversationCreated.participants.findIndex(
    (participant) => participant.user.id === session?.user?.id
  );

  return isParticipant !== -1;
};

export const onConversationCreated: SubscriptionResolvers["onConversationCreated"] = {
  subscribe: withFilter(asyncIteratorFn, filterFn) as any,
};
