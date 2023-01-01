import React, { createContext, useContext } from "react";
import type { Session } from "next-auth";

interface ChatContext {
  session: Session;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const chatContext = createContext<ChatContext>({} as ChatContext);

export function useConversationContext() {
  const context = useContext(chatContext);
  return context;
}

export function ChatProvider({ children, session }: ChatContext & { children: React.ReactNode }) {
  return <chatContext.Provider value={{ session }}>{children}</chatContext.Provider>;
}
