import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User;
  }

  interface User {
    id: string;
    username?: string;
  }
}
