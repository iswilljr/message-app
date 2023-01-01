import { Box } from "@chakra-ui/react";
import ConversationList from "./List";

export function Conversations() {
  return (
    <Box width={{ base: "100%", md: 400 }} bg="whiteAlpha.50" py={6} px={3}>
      <ConversationList />
    </Box>
  );
}
