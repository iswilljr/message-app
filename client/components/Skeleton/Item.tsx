import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

export function SkeletonItem() {
  return (
    <Stack
      height={70}
      direction="row"
      align="center"
      justify="space-between"
      p={4}
      borderRadius={4}
      position="relative"
      pr={5}
    >
      <SkeletonCircle ml={2} w="48px" height="48px" />
      <Flex flex={1} justify="space-between" width="80%" height="100%">
        <Flex direction="column" width="70%" justify="space-between" height="100%">
          <Skeleton width="100%" height="10px" />
          <Skeleton width="100%" height="20px" />
        </Flex>
        <Skeleton width="70px" height="10px" />
      </Flex>
    </Stack>
  );
}
