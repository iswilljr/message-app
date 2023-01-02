import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ConversationFragment } from "@client/types/graphql";
import { formatDate } from "@client/utils/format-data";
import { formatUsernames } from "@client/utils/format-usernames";

interface ConversationItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  conversation: ConversationFragment;
  selectedId: string;
  isSelected: boolean;
  userId: string;
}
export function ConversationItem({ conversation, isSelected, selectedId, userId, ...props }: ConversationItemProps) {
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
            <Box width="140%">
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
