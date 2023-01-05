import type { Session } from "next-auth";
import type { PrismaClient } from "@prisma/client";
import type { PubSub } from "graphql-subscriptions";
import type { Context as GraphQLSubscriptionContext } from "graphql-ws";
import {
  MutationResolvers as GraphQLMutationResolvers,
  QueryResolvers as GraphQLQueryResolvers,
  Resolvers as GraphQLResolvers,
  SubscriptionResolvers as GraphQLSubscriptionResolvers,
} from "./graphql.js";

declare global {
  interface Context {
    session: Session;
    prisma: PrismaClient;
    pubsub: PubSub;
  }

  interface UnsafeSession extends Session {
    user?: Session["user"] & { id?: string };
  }

  interface UnsafeContext extends Context {
    session?: UnsafeSession | null;
  }

  interface SubscriptionContext extends GraphQLSubscriptionContext {
    connectionParams: {
      session?: Session | null;
    };
  }

  type NoUndefinedField<T> = { [P in keyof T]-?: Exclude<T[P], null | undefined> };

  type NoUndefinedObjField<T> = { [P in keyof T]?: NoUndefinedField<T[P]> };

  type Resolvers = NoUndefinedObjField<GraphQLResolvers<Context>>;

  type QueryResolvers = NoUndefinedField<GraphQLQueryResolvers<Context>>;

  type MutationResolvers = NoUndefinedField<GraphQLMutationResolvers<Context>>;

  type SubscriptionResolvers = NoUndefinedField<GraphQLSubscriptionResolvers<Context>>;
}

export {};
