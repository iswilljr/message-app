import { Box, Button } from "@mantine/core";
import { useRouter } from "next/router";
import { ConversationModal } from "./Modal/Modal";
import { ConversationList, ConversationListProps } from "./List";
import { signOut } from "next-auth/react";
import { IconLogout, IconPencilPlus } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";

export function Conversations(props: ConversationListProps) {
  const [isOpen, { close: onClose, open: onOpen }] = useDisclosure(false);
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", sm: "flex" }}
      w={{ base: "100%", sm: 400 }}
      miw={{ base: "100%", sm: 400 }}
      sx={(theme) => ({
        flexDirection: "column",
        backgroundColor: theme.colors.white[0],
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
      })}
    >
      <Box px="sm">
        <Button
          rightIcon={<IconPencilPlus size={20} />}
          py="sm"
          px="md"
          mb="md"
          radius="md"
          bg="black.4"
          onClick={onOpen}
          w="100%"
          ta="center"
          h="auto"
          color="white.9"
        >
          Start a new Conversation
        </Button>
      </Box>
      <ConversationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <ConversationList {...props} />
      <Box px="sm">
        <Button leftIcon={<IconLogout />} onClick={() => signOut()} w="100%">
          Logout
        </Button>
      </Box>
    </Box>
  );
}
