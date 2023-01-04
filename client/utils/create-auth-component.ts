import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface Result {
  session: Session | null;
}

interface Options {
  authRequired?: boolean;
  redirect: string;
  onAuth?: (ctx: GetServerSidePropsContext, session: Session) => GetServerSidePropsResult<Result>;
}

export const createAuthComponent = (options: Options): GetServerSideProps<Result> => {
  const { redirect, authRequired = true, onAuth } = options;

  return async (ctx) => {
    const session = await getSession({ ctx });

    const valid = Boolean(session) === authRequired;

    if (!valid) {
      return { redirect: { destination: redirect, permanent: false } };
    }

    if (session && onAuth) return onAuth(ctx, session);

    return { props: { session } };
  };
};
