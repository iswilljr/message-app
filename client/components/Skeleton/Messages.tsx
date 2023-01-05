import { Flex } from "@mantine/core";
import { SkeletonMessage } from "./Message";

export function SkeletonMessages() {
  return (
    <Flex direction="column" justify="flex-end" sx={{ overflow: "hidden", flex: 1 }}>
      <Flex gap={4} direction="column-reverse" h="100%" sx={{ overflow: "hidden" }}>
        {[...Array(6)].map((_, i) => (
          <SkeletonMessage key={i} index={i} />
        ))}
      </Flex>
    </Flex>
  );
}
