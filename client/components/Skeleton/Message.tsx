import { Flex, Skeleton, Stack } from "@mantine/core";
import { useRef } from "react";

export function SkeletonMessage() {
  const widths = useRef(["20%", "25%", "30%", "35%", "40%", "45%", "50%", "55%", "60%", "65%"]).current;
  const width = useRef(widths.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]).current;

  return (
    <Stack sx={{ flexDirection: "row", wordBreak: "break-word" }} py={4} px="md" spacing={4}>
      <Flex align="flex-end">
        <Skeleton radius="xl" w="26px" h="26px" />
      </Flex>
      <Stack spacing={1} w="100%">
        <Skeleton width="50px" height="15px" />
        <Skeleton mt={4} bg="white.2" px="sm" py="xs" radius="md" width={width} h={30}></Skeleton>
      </Stack>
    </Stack>
  );
}
