import { createAuthComponent } from "@client/utils/create-auth-component";

export { UsernameForm as default } from "components/UsernameForm";

export const getServerSideProps = createAuthComponent({
  redirect: "/login",
  onAuth(ctx, session) {
    if (session.user?.username) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return { props: { session } };
  },
});
