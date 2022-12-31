import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./server/schema/typeDefs.ts",
  generates: {
    "server/types/graphql.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
