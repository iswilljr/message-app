import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { getSession } from "next-auth/react";

const wsLink =
  typeof window !== "undefined" &&
  new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4001/graphql",
      async connectionParams() {
        return { session: await getSession() };
      },
    })
  );

const httpLink = new HttpLink({
  credentials: "include",
  uri: "http://localhost:4001/graphql",
});

const splitLink =
  typeof window !== "undefined" && wsLink
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === "OperationDefinition" && definition.operation === "subscription";
        },
        wsLink,
        httpLink
      )
    : httpLink;

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
