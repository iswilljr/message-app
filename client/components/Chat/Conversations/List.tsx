/* eslint-disable @typescript-eslint/no-floating-promises */
import { Box, List, ListItem, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useChatContext } from "../Context";
import { ConversationItem } from "./Item";
import { ConversationModal } from "./Modal/Modal";
import { ConversationFragment } from "@client/types/graphql";

export interface ConversationListProps {
  conversations?: ConversationFragment[];
  onViewConversation: (id: string) => Promise<void>;
}

export function ConversationList({ conversations, onViewConversation }: ConversationListProps) {
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
        {conversations?.map((conversation) => {
          const participant = conversation.participants.find((participant) => participant.user.id === session.user?.id);

          return (
            <ListItem key={conversation.id}>
              <ConversationItem
                conversation={conversation}
                isSelected={conversation.id === conversationId}
                selectedId={conversationId as string}
                userId={session.user?.id ?? ""}
                hasSeenLatestMessage={participant?.hasSeenLatestMessage}
                onClick={async () => {
                  const conversationId = conversation.id;
                  router.push({ query: { conversationId } });
                  if (participant?.hasSeenLatestMessage) return;
                  await onViewConversation(conversationId);
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
