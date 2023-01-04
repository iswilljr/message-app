import type { ConversationFragment, MessageFragment, OnConversationUpdatedPayload } from "./graphql";

export interface ConversationsQuery {
  conversations?: ConversationFragment[];
}

export interface ConversationUpdatedSubscription {
  onConversationUpdated?: OnConversationUpdatedPayload;
}

export interface MessagesQuery {
  messages?: MessageFragment[];
}

export interface MessageSubscription {
  onMessageSent?: MessageFragment;
}
