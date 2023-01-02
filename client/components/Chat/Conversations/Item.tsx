import { Stack, Text } from "@chakra-ui/react";
import { ConversationFragment } from "@client/types/graphql";

interface ConversationItemProps extends ConversationFragment {}

export function ConversationItem(props: ConversationItemProps) {
  return (
    <Stack p={2} _hover={{ bg: "whiteAlpha.200" }} borderRadius={4} cursor="pointer">
      <Text>{props.id}</Text>
    </Stack>
  );
}
