import { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
const endpointUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://holgerk1.sg-host.com";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
      {
         [`https://holgerk1.sg-host.com/graphql`]: {
            headers: { 'User-Agent': 'vulcanus-codegen' },
         },
      },
   ],
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
