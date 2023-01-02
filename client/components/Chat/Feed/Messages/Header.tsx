import { Button, Stack, Text } from "@chakra-ui/react";
import { ConversationFragment } from "@client/types/graphql";
import { formatUsernames } from "@client/utils/format-usernames";
import { useRouter } from "next/router";
import { useChatContext } from "../../Context";

interface MessagesHeaderProps {
  conversation?: ConversationFragment;
}

export default function MessagesHeader({ conversation }: MessagesHeaderProps) {
  const router = useRouter();
  const { session } = useChatContext();

  return (
    <Stack
      direction="row"
      align="center"
      spacing={6}
      py={5}
      px={{ base: 4, md: 0 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      bg="whiteAlpha.100"
      width="100%"
    >
      <Button display={{ md: "none" }} onClick={() => router.replace("/")}>
        Back
      </Button>
      <Stack direction="row">
        <Text color="whiteAlpha.600">To:</Text>
        <Text fontWeight={600}>{formatUsernames(conversation?.participants ?? [], session.user?.id ?? "")}</Text>
      </Stack>
    </Stack>
  );
}
