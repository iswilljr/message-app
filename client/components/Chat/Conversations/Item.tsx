import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ConversationFragment } from "@client/types/graphql";
import { formatDate } from "@client/utils/format-data";
import { formatUsernames } from "@client/utils/format-usernames";
import { IconPoint } from "@tabler/icons";

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
  return (
    <Stack
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      cursor="pointer"
      borderRadius={4}
      bg={conversation.id === selectedId ? "whiteAlpha.200" : "none"}
      _hover={{ bg: "whiteAlpha.100" }}
      position="relative"
      {...props}
    >
      <Flex position="absolute" left="0">
        {!hasSeenLastMessage && (
          <IconPoint fill="var(--chakra-colors-green-400)" fontSize={18} color="var(--chakra-colors-green-400)" />
        )}
      </Flex>
      <Avatar />
      <Flex flex={1} justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" height="100%">
          <Text
            title={formatUsernames(conversation.participants, "userId")}
            fontWeight={600}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatUsernames(conversation.participants, userId)}
          </Text>
          {conversation.latestMessage && (
            <Box width="140%" display="flex">
              {conversation.latestMessage.sender.id === userId && (
                <Text color="whiteAlpha.400" mr={1}>
                  you:{" "}
                </Text>
              )}
              <Text color="whiteAlpha.700" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {conversation.latestMessage.node}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="whiteAlpha.700" textAlign="right">
          {formatDate(conversation.updatedAt)}
        </Text>
      </Flex>
    </Stack>
  );
}
