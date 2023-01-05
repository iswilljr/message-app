import { Box, Button, Text } from "@mantine/core";
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
        padding: `${theme.spacing.md}px ${theme.spacing.sm}px`,
      })}
    >
      <Button
        rightIcon={<IconPencilPlus size={20} />}
        py="sm"
        px="md"
        mb="md"
        radius="md"
        bg="black.4"
        onClick={onOpen}
      >
        <Text align="center" color="white.9">
          Start a new Conversation
        </Text>
      </Button>
      <ConversationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <ConversationList {...props} />
      <Button leftIcon={<IconLogout />} onClick={() => signOut()} w="100%">
        Logout
      </Button>
    </Box>
  );
}
