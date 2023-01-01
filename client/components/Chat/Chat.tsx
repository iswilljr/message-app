import { Flex } from "@chakra-ui/react";
import { Conversations } from "./Conversations/Conversations";
import { Feed } from "./Feed/Feed";

export function Chat() {
  return (
    <Flex height="100vh">
      <Conversations />
      <Feed />
    </Flex>
  );
}
