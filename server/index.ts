import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { env } from "./utils/env.js";
import { schema } from "./schema/index.js";
import express from "express";
import http from "http";
import cors from "cors";
import { logger } from "./utils/logger.js";

const app = express();
const httpServer = http.createServer(app);

const prisma = new PrismaClient({});
const pubsub = new PubSub();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

// eslint-disable-next-line react-hooks/rules-of-hooks
const serverCleanup = useServer(
  {
    schema,
    context: (ctx: SubscriptionContext): UnsafeContext => ({
      session: ctx.connectionParams?.session ?? null,
      prisma,
      pubsub,
    }),
  },
  wsServer
);

const server = new ApolloServer<UnsafeContext>({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  }),
  express.json(),
  expressMiddleware<UnsafeContext>(server, {
    context: async ({ req }): Promise<UnsafeContext> => {
      const session = await getSession({ req });
      return { session, prisma, pubsub };
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

logger.ready(`started server on 0.0.0.0:4000, url: http://localhost:4000`);
