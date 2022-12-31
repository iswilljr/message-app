import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import NextAuth, { AuthOptions } from "next-auth";
import { env } from "@client/env/server.mjs";
import { prisma } from "@client/utils/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, user }) => ({ ...session, user: { ...session.user, ...user } }),
  },
};

export default NextAuth(authOptions);
