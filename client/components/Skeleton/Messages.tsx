import { Flex } from "@chakra-ui/react";
import { SkeletonMessage } from "./Message";

export function SkeletonMessages() {
  return (
    <Flex direction="column" justify="flex-end" overflow="hidden" flex={1}>
      <Flex direction="column-reverse" height="100%" overflowY="hidden">
        {[...Array(50)].map((_, i) => (
          <SkeletonMessage key={i} />
        ))}
      </Flex>
    </Flex>
  );
}
