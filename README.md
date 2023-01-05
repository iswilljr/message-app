# Me - Chat App

## Technologies used

- ✅ **Frameworks**: [Nextjs 13](https://nextjs.org), [Apollo](https://www.apollographql.com)
- ✅ **Auth**: [Next-Auth.js](https://next-auth.js.org)
- ✅ **ORM**: [Prisma](https://prisma.io).
- ✅ **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas/database).
- ✅ **Styling**: [Mantine](https://mantine.dev/).
- ✅ **Typescript Schema Validation**: [Zod](https://github.com/colinhacks/zod).

## Project structure

```bash
- client
  |- components
  |- env
  |- graphql
  |- pages
  |- utils
  |- types
- server
  |- schema
  |- utils
  |- types
- utils
  |- prisma
```

## Getting Started

1. Install dependencies:

```bash
yarn install
# or
npm install
```

2. Create a **.env** file inside client and server folders:

> The environment variables must match the following schemas: [client schema](https://github.com/iswilljr/message-app/blob/master/client/env/schema.mjs) and [server schema](https://github.com/iswilljr/message-app/blob/master/server/utils/env.ts)

```bash
cp -r client/.env.template client/.env
cp -r server/.env.template server/.env
```

### How to get environment variables

**MongoDB Atlas database:**

- [Create an Atlas account](https://www.mongodb.com/docs/atlas/tutorial/create-atlas-account/)
- [Deploy a free cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
- [Add your connection IP address to your IP access list](https://www.mongodb.com/docs/atlas/security/add-ip-address-to-list/)
- [Create a database user for your cluster](https://www.mongodb.com/docs/atlas/tutorial/create-mongodb-user-for-cluster/)
- [Connect to your cluster](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)
- Copy the connection URI string and paste it into MONGODB_URI env.

**Github OAuth:**

- [Click here to create new Github OAuth app](https://github.com/settings/applications/new)
- Go to "Client secrets" and generate new client secret and and paste it into GITHUB_CLIENT_SECRET env
- Copy the Client ID and paste it into GITHUB_CLIENT_ID env

**Google OAuth:**

- [Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Configuration](https://console.developers.google.com/apis/credentials)
- [Next Auth Google Configuration](https://next-auth.js.org/providers/google)
- Copy the Client ID and paste it into GOOGLE_CLIENT_ID env
- Copy the Client Secret and paste it into GOOGLE_CLIENT_SECRET env

**Next Auth:**

- NEXTAUTH_SECRET: `your_secret`.
- NEXTAUTH_URL: `http://localhost:3000/`.

**Public API URLS:**

- NEXT_PUBLIC_WS_GRAPHQL_URI: `ws://localhost:4000/graphql`
- NEXT_PUBLIC_GRAPHQL_URI: `http://localhost:4000/graphql`

**Others:**

- CLIENT_ORIGIN: `http://localhost:3000`

### Start developing

Now you can run:

```bash
yarn dev
```

## License

This project is [MIT Licensed](./LICENSE).
