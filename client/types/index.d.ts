import type { ConversationFragment, MessageFragment } from "./graphql";

export interface ConversationsQuery {
  conversations?: ConversationFragment[];
}

export interface ConversationCreatedSubscription {
  onConversationCreated?: ConversationFragment;
}

export interface ConversationUpdatedSubscription {
  onConversationUpdated?: {
    conversation: ConversationFragment;
    senderId: string;
  };
}

export interface MessagesQuery {
  messages?: MessageFragment[];
}

export interface MessageSubscription {
  onMessageSent?: MessageFragment;
}
