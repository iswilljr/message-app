import { Avatar, Box, Flex, Text } from "@mantine/core";
import { IconPoint } from "@tabler/icons";
import { formatDate } from "@/utils/format-data";
import { formatUsernames } from "@/utils/format-usernames";
import type { ConversationFragment } from "@/types/graphql";

interface ConversationItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  conversation: ConversationFragment;
  selectedId: string;
  isSelected: boolean;
  userId: string;
  hasSeenLatestMessage?: boolean;
}
export function ConversationItem({
  conversation,
  isSelected,
  selectedId,
  userId,
  hasSeenLatestMessage: hasSeenLastMessage,
  ...props
}: ConversationItemProps) {
  const otherParticipant = conversation.participants.find((p) => p.user.id !== userId);

  return (
    <Flex
      align="center"
      justify="space-between"
      p="xs"
      pl="lg"
      h={70}
      gap="xs"
      sx={(theme) => ({
        position: "relative",
        backgroundColor: conversation.id === selectedId ? theme.colors.white[3] : "none",
        borderRadius: theme.radius.md,
        ":hover": {
          backgroundColor: theme.colors.white[2],
        },
      })}
      {...props}
    >
      <Flex sx={{ position: "absolute", left: -2 }}>
        {!hasSeenLastMessage && (
          <IconPoint fill="var(--mantine-color-green-5)" fontSize={18} color="var(--mantine-color-green-5)" />
        )}
      </Flex>
      <Avatar src={otherParticipant?.user.image} alt={otherParticipant?.user.username ?? ""} radius="xl" />
      <Flex sx={{ flex: 1 }} justify="space-between" w="80%" h="100%">
        <Flex direction="column" w="70%" h="100%">
          <Text
            title={formatUsernames(conversation.participants, "userId")}
            weight={600}
            color="white.7"
            sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {formatUsernames(conversation.participants, userId)}
          </Text>
          {conversation.latestMessage && (
            <Box w="140%" display="flex">
              {conversation.latestMessage.sender.id === userId && (
                <Text color="white.5" mr={4}>
                  you:{" "}
                </Text>
              )}
              <Text color="white.8" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {conversation.latestMessage.node}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="white.8" align="right">
          {formatDate(conversation.updatedAt)}
        </Text>
      </Flex>
    </Flex>
  );
}
