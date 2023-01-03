import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ConversationList, ConversationListProps } from "./List";

export function Conversations(props: ConversationListProps) {
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
      <ConversationList {...props} />
    </Box>
  );
}
