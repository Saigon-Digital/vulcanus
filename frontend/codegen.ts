import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
const endpointUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

const config: CodegenConfig = {
  overwrite: true,
  schema: `${endpointUrl}/graphql`,
  documents: [
    "src/**/**/*.{tsx,ts,graphql,gql}",

  ],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
