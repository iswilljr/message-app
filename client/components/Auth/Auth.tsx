import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export function Auth() {
  return (
    <Center height="100vh">
      <Stack>
        <Text align="center">Me</Text>
        <Button onClick={() => signIn("github")}>Login with Github</Button>
        <Button onClick={() => signIn("google")}>Login with Google</Button>
      </Stack>
    </Center>
  );
}
