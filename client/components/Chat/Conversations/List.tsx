import { useQuery } from "@apollo/client";
import { Box, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { CONVERSATIONS_QUERY } from "@client/graphql/queries";
import { ON_CONVERSATION_CREATED } from "@client/graphql/subscriptions";
import { ConversationFragment, ConversationsQueryVariables } from "@client/types/graphql";
import { useEffect } from "react";
import { ConversationItem } from "./Item";
import { ConversationModal } from "./Modal/Modal";

interface ConversationQuery {
  conversations?: ConversationFragment[];
}

interface ConversationSubscription {
  onConversationCreated?: ConversationFragment;
}

export default function ConversationList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, subscribeToMore } = useQuery<ConversationQuery, ConversationsQueryVariables>(CONVERSATIONS_QUERY);

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
    <Box width="100%">
      <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen}>
        <Text align="center" color="whiteAlpha.800">
          Start a new Conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <List>
        {data?.conversations?.map((conversation) => (
          <ListItem key={conversation.id}>
            <ConversationItem {...conversation} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
