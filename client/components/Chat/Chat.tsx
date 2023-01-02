import { useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { CONVERSATIONS_QUERY } from "@client/graphql/queries";
import { ON_CONVERSATION_CREATED } from "@client/graphql/subscriptions";
import { ConversationSubscription, ConversationsQuery } from "@client/types";
import { useEffect } from "react";
import { Conversations } from "./Conversations/Conversations";
import { Feed } from "./Feed/Feed";

export function Chat() {
  const { data, subscribeToMore } = useQuery<ConversationsQuery>(CONVERSATIONS_QUERY);

  useEffect(() => {
    const unsubscribe = subscribeToMore<ConversationSubscription>({
      document: ON_CONVERSATION_CREATED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data?.onConversationCreated) return prev;
        const newConversation = subscriptionData.data.onConversationCreated;

        return {
          conversations: [newConversation, ...(prev.conversations ?? [])],
        };
      },
    });

    return () => unsubscribe();
  }, []);

  return (
    <Flex height="100vh">
      <Conversations conversations={data?.conversations} />
      <Feed conversations={data?.conversations} />
    </Flex>
  );
}
