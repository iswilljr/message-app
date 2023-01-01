import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { ConversationModal } from "./Modal/Modal";

export default function ConversationList() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box width="100%">
      <Box py={2} px={4} mb={4} bg="blackAlpha.300" borderRadius={4} cursor="pointer" onClick={onOpen}>
        <Text align="center" color="whiteAlpha.800">
          Start a new Conversation
        </Text>
      </Box>
      <ConversationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
}
