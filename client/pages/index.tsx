/* eslint-disable eqeqeq */
import { Chat } from "@/components/Chat";
import { createAuthComponent } from "@/utils/create-auth-component";

export default function Home() {
  return <Chat />;
}

export const getServerSideProps = createAuthComponent({
  redirect: "/login",
  onAuth(ctx, session) {
    if (!session.user?.username) {
      return { redirect: { destination: "/profile", permanent: false } };
    }
    return { props: { session } };
  },
});
