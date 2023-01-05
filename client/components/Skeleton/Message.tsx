import { useRef } from "react";
import { Flex, Skeleton, Stack } from "@mantine/core";

interface SkeletonMessageProps {
  index: number;
}

export function SkeletonMessage({ index }: SkeletonMessageProps) {
  const width = useRef(["50%", "40%", "60%", "30%", "65%", "35%"][index]).current;

  return (
    <Stack sx={{ flexDirection: "row", wordBreak: "break-word" }} py={4} px="md" spacing={4}>
      <Flex align="flex-end">
        <Skeleton radius="xl" w="26px" h="26px" />
      </Flex>
      <Stack spacing={1} w="100%">
        <Skeleton width="50px" height="15px" />
        <Skeleton mt={4} bg="white.2" px="sm" py="xs" radius="md" h={30} w={width}></Skeleton>
      </Stack>
    </Stack>
  );
}
