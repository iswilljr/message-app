import {
  Resolvers as GraphQLResolvers,
  QueryResolvers as GraphQLQueryResolvers,
  MutationResolvers as GraphQLMutationResolvers,
  SubscriptionResolvers as GraphQLSubscriptionResolvers,
} from "./graphql.js";
import type { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";
import type { PubSub } from "graphql-subscriptions";
import type { Context as GraphQLSubscriptionContext } from "graphql-ws";

declare global {
  interface Context {
    session?: Session | null;
    prisma: PrismaClient;
    pubsub: PubSub;
  }

  interface SubscriptionContext extends GraphQLSubscriptionContext {
    connectionParams: {
      session?: Session | null;
    };
  }

  interface Resolvers extends GraphQLResolvers<Context> {}

  interface QueryResolvers extends GraphQLQueryResolvers<Context> {}

  interface MutationResolvers extends GraphQLMutationResolvers<Context> {}

  interface SubscriptionResolvers extends GraphQLSubscriptionResolvers<Context> {}
}

export {};
