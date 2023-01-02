import { useQuery } from "@apollo/client";
import { Box, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { CONVERSATIONS_QUERY } from "@client/graphql/queries";
import { ConversationFragment, ConversationsQueryVariables } from "@client/types/graphql";
import { ConversationItem } from "./Item";
import { ConversationModal } from "./Modal/Modal";

export default function ConversationList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery<{ conversations?: ConversationFragment[] }, ConversationsQueryVariables>(
    CONVERSATIONS_QUERY
  );

  console.log(data);

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
