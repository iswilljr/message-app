import { Box, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { ConversationFragment } from "@client/types/graphql";
import { useRouter } from "next/router";
import { useChatContext } from "../Context";
import { ConversationItem } from "./Item";
import { ConversationModal } from "./Modal/Modal";

interface ConversationListProps {
  conversations?: ConversationFragment[];
}

export default function ConversationList({ conversations }: ConversationListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { session } = useChatContext();
  const { conversationId } = router.query;

  return (
    <Box width="100%">
      <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen}>
        <Text align="center" color="whiteAlpha.800">
          Start a new Conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <List>
        {conversations?.map((conversation) => (
          <ListItem key={conversation.id}>
            <ConversationItem
              conversation={conversation}
              isSelected={conversation.id === conversationId}
              selectedId={conversationId as string}
              userId={session.user?.id ?? ""}
              onClick={() => router.push({ query: { conversationId: conversation.id } })}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
