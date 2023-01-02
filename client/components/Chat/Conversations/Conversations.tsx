import { Box } from "@chakra-ui/react";
import { ConversationsQuery } from "@client/types";
import { useRouter } from "next/router";
import ConversationList from "./List";

interface ConversationsProps extends ConversationsQuery {}

export function Conversations({ conversations }: ConversationsProps) {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: 400 }}
      minWidth={{ base: "100%", md: 400 }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      <ConversationList conversations={conversations} />
    </Box>
  );
}
