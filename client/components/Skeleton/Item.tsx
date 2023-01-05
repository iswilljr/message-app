import { Flex, Skeleton } from "@mantine/core";

export function SkeletonItem() {
  return (
    <Flex
      h={70}
      sx={(theme) => ({ position: "relative", flexDirection: "row", borderRadius: theme.spacing.md })}
      align="center"
      justify="space-between"
      p="xs"
      pl="lg"
      gap="xs"
      pos="relative"
    >
      <Skeleton radius="xl" w="38px" height="38px" />
      <Flex sx={{ flex: 1 }} justify="space-between" w="80%" h="100%">
        <Flex gap="xs" direction="column" w="100%" justify="center" h="100%">
          <Skeleton width="50%" height="10px" />
          <Skeleton width="100%" height="20px" />
        </Flex>
        <Skeleton sx={(theme) => ({ position: "absolute", right: theme.spacing.xs })} width="70px" height="10px" />
      </Flex>
    </Flex>
  );
}
