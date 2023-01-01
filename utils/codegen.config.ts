import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./server/schema/typeDefs.ts",
  generates: {
    "server/types/graphql.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./client/types/": {
      documents: ["client/graphql/**/*.ts"],
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
