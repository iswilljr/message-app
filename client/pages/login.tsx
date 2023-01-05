import { Button, Center, Stack, Text } from "@mantine/core";
import { signIn } from "next-auth/react";
import { createAuthComponent } from "@/utils/create-auth-component";

export default function Login() {
  return (
    <Center sx={{ height: "100vh" }}>
      <Stack>
        <Text align="center">Me - Chat App</Text>
        <Button onClick={() => signIn("github")}>Login with Github</Button>
        <Button onClick={() => signIn("google")}>Login with Google</Button>
      </Stack>
    </Center>
  );
}

export const getServerSideProps = createAuthComponent({ authRequired: false, redirect: "/" });
