import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: String!
    username: String!
  }

  type Query {
    searchUsers(id: String!): [User!]
  }

  type Mutation {
    createUsername(username: String!): CreateUsername
    createConversation(userIds: [String!]!): CreateConversation
  }

  type CreateUsername {
    success: Boolean!
    error: String
  }

  type CreateConversation {
    conversationId: String!
  }
`;
