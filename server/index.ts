import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { getSession } from "next-auth/react";
import express from "express";
import http from "http";
import cors from "cors";
import { env } from "./env/schema.js";
import { typeDefs, resolvers } from "./schema/index.js";
import { PrismaClient } from "@prisma/client";

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

const prisma = new PrismaClient({});

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  }),
  express.json(),
  expressMiddleware<Context>(server, {
    context: async ({ req }) => {
      const session = await getSession({ req });
      return { session, prisma };
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4001 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
