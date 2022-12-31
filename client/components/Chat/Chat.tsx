import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export function Chat() {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
