import { Center, Text } from "@mantine/core";
import { IconMessage, IconMessages, IconMessagePlus } from "@tabler/icons";

interface NoConversationProps {
  loading: boolean;
  hasConversations: boolean;
}

export default function NoConversation({ loading, hasConversations }: NoConversationProps) {
  const Icon = loading ? IconMessage : hasConversations ? IconMessages : IconMessagePlus;
  const text = loading
    ? "Loading conversations..."
    : hasConversations
    ? "Select a conversation"
    : "Start by creating a conversation";

  return (
    <Center w="100%" h="100%" sx={{ flexDirection: "column" }}>
      <Icon size={150} />
      <Text>{text}</Text>
    </Center>
  );
}
