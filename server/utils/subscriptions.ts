import type { Message, OnConversationUpdatedPayload } from "../types/graphql.js";

export enum SUBSCRIPTIONS {
  CONVERSATION_UPDATED = "0",
  MESSAGE_SENT = "1",
}

export type Resolver<Payload, Args, ReturnType> = (payload: Payload, args: Args, context: Context) => ReturnType;

export interface SubscriptionData {
  conversationUpdated: {
    onConversationUpdated: OnConversationUpdatedPayload;
  };
  messageSent: {
    onMessageSent: Message;
  };
}
