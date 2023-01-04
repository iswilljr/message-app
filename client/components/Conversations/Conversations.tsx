import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ConversationModal } from "./Modal/Modal";
import { ConversationList, ConversationListProps } from "./List";
import { signOut } from "next-auth/react";
import { IconLogout, IconPencilPlus } from "@tabler/icons";

export function Conversations(props: ConversationListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Box
      flexDirection="column"
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: 400 }}
      minWidth={{ base: "100%", md: 400 }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      <Button
        rightIcon={<IconPencilPlus size={20} />}
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text align="center" color="whiteAlpha.800">
          Start a new Conversation
        </Text>
      </Button>
      <ConversationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <ConversationList {...props} />
      <Button leftIcon={<IconLogout />} onClick={() => signOut()} width="100%">
        Logout
      </Button>
    </Box>
  );
}
