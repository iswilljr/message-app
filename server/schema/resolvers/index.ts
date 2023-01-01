import { createUsername } from "./mutation/create-username.js";
import { searchUsers } from "./query/search-users.js";

export const resolvers: Resolvers = {
  Query: {
    searchUsers,
  },
  Mutation: {
    createUsername,
  },
};
