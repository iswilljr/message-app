import { createConversation } from "./mutation/create-conversation.js";
import { createUsername } from "./mutation/create-username.js";
import { deleteConversation } from "./mutation/delete-conversation.js";
import { markConversationAsRead } from "./mutation/mark-conversation-as-read.js";
import { sendMessage } from "./mutation/send-message.js";
import { conversations } from "./query/conversations.js";
import { messages } from "./query/messages.js";
import { searchUsers } from "./query/search-users.js";
import { onConversationUpdated } from "./subscriptions/on-conversation-updated.js";
import { onMessageSent } from "./subscriptions/on-message-sent.js";

export const resolvers: Resolvers = {
  Query: {
    conversations,
    messages,
    searchUsers,
  },
  Mutation: {
    createConversation,
    createUsername,
    deleteConversation,
    markConversationAsRead,
    sendMessage,
  },
  Subscription: {
    onConversationUpdated,
    onMessageSent,
  },
};
