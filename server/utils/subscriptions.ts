export enum SUBSCRIPTIONS {
  CONVERSATION_CREATED = "0",
  MESSAGE_SENT = "1",
  CONVERSATION_UPDATED = "2",
}

export type Resolver<Payload, Args, ReturnType> = (payload: Payload, args: Args, context: Context) => ReturnType;
