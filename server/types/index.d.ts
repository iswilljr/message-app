import { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

export interface MyContext {
  session?: Session | null;
  prisma: PrismaClient;
}

export type CreateUsernameData = { success: true } | { success: false; error: string };
