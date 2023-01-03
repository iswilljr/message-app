import { createConversation } from "./mutation/create-conversation.js";
import { createUsername } from "./mutation/create-username.js";
import { sendMessage } from "./mutation/send-message.js";
import { conversations } from "./query/conversations.js";
import { messages } from "./query/messages.js";
import { searchUsers } from "./query/search-users.js";
import { onConversationCreated } from "./subscriptions/on-conversation-created.js";
import { onMessageSent } from "./subscriptions/on-message-sent.js";

export const resolvers: Resolvers = {
  Query: {
    searchUsers,
    conversations,
    messages,
  },
  Mutation: {
    createUsername,
    createConversation,
    sendMessage,
  },
  Subscription: {
    onConversationCreated,
    onMessageSent,
  },
};
