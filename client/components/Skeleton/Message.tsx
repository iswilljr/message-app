import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import { useRef } from "react";

export function SkeletonMessage() {
  const widths = useRef(["20%", "25%", "30%", "35%", "40%", "45%", "50%", "55%", "60%", "65%"]).current;
  const width = useRef(widths.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]).current;

  return (
    <Stack direction="row" py={2} px={4} spacing={2} wordBreak="break-word">
      <Flex align="flex-end">
        <SkeletonCircle w="20px" h="20px" />
      </Flex>
      <Stack spacing={1} width="100%">
        <Stack direction="row" align="center">
          <Skeleton mr="1" width="150px" height="15px" />
        </Stack>
        <Flex>
          <Skeleton bg="whiteAlpha.100" px={2} py={1} borderRadius={4} width={width} h={50}></Skeleton>
        </Flex>
      </Stack>
    </Stack>
  );
}
