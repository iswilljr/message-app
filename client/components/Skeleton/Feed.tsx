import { Box, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { SkeletonMessages } from "./Messages";

export function SkeletonFeed() {
  return (
    <Flex direction="column" justify="space-between" overflow="hidden" flexGrow={1}>
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
        <Stack direction="row" justify="space-between" align="center" width="100%" px={4}>
          <Stack direction="row" align="center">
            <Text color="whiteAlpha.600">To:</Text>
            <Skeleton width="100px" height="15px" />
          </Stack>
          <Skeleton borderRadius={6} w="30px" h="30px" />
        </Stack>
      </Stack>
      <SkeletonMessages />
      <Box px={4} py={6} w="100%">
        <Flex gap={2} h="100%" align="center">
          <Skeleton width="100%" h="40px" />
          <Skeleton borderRadius={6} w="40px" h="40px" />
        </Flex>
      </Box>
    </Flex>
  );
}
