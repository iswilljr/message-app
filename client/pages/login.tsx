import { createAuthComponent } from "@client/utils/create-auth-component";

export { Auth as default } from "components/Auth";

export const getServerSideProps = createAuthComponent({ authRequired: false, redirect: "/" });
