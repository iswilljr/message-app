import { useRouter } from "next/router";
import { ActionIcon, Box, Flex, Skeleton, Stack, Text } from "@mantine/core";
import { IconArrowNarrowLeft, IconTrash } from "@tabler/icons";
import { SkeletonMessages } from "./Messages";

export function SkeletonFeed() {
  const router = useRouter();

  return (
    <Flex direction="column" justify="space-between" sx={{ overflow: "hidden", flexGrow: 1 }}>
      <Stack
        align="center"
        spacing="lg"
        py="lg"
        px="md"
        sx={(theme) => ({ flexDirection: "row", borderBottom: `1px solid ${theme.colors.white[3]}` })}
        bg="white.2"
        w="100%"
      >
        <ActionIcon aria-label="Go back" display={{ base: "flex", sm: "none" }} onClick={() => router.replace("/")}>
          <IconArrowNarrowLeft />
        </ActionIcon>
        <Flex sx={{ flex: 1, overflow: "hidden" }} justify="space-between" align="center">
          <Flex gap={8} sx={{ flexDirection: "row", overflow: "hidden" }} align="center">
            <Text color="white.7">To:</Text>
            <Skeleton width="100px" height="15px" />
          </Flex>
          <ActionIcon disabled ml="md" aria-label="Delete conversation">
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Stack>
      <SkeletonMessages />
      <Box p="md" w="100%">
        <Flex w="100%" justify="space-between" gap={4}>
          <Skeleton width="100%" h="34px" />
          <Skeleton radius="sm" w="36px" h="34px" />
        </Flex>
      </Box>
    </Flex>
  );
}
