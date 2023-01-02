import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type SearchUser {
    id: String!
    username: String
  }

  type User {
    id: String!
    username: String
    email: String
    image: String
  }

  type Conversation {
    id: String!
    participants: [Participants!]!
    latestMessage: Message
    createdAt: Date!
    updatedAt: Date!
  }

  type Participants {
    id: String!
    user: User!
    hasSeenLatestMessage: Boolean!
  }

  type Message {
    id: String!
    sender: User!
    node: String!
    createdAt: Date!
  }

  type Query {
    searchUsers(id: String!): [SearchUser!]
    conversations: [Conversation!]
  }

  type Mutation {
    createUsername(username: String!): CreateUsername
    createConversation(userIds: [String!]!): CreateConversation
  }

  type Subscription {
    onConversationCreated: Conversation
  }

  type CreateUsername {
    success: Boolean!
    error: String
  }

  type CreateConversation {
    conversationId: String!
  }
`;
