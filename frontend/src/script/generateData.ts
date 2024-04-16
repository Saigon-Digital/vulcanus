import {ApolloClient, InMemoryCache} from "@apollo/client";
import {loadEnvConfig} from "@next/env";
import {existsSync, mkdirSync, writeFileSync} from "fs";
import {gql} from "../__generated__";

loadEnvConfig(process.cwd());
const DATA_DIR = "./src/data";

const endpointUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${endpointUrl}/graphql`,
});

(async () => {
  try {
    let result = {};
    let paths: any[] = [];
    const {data} = await client.query({
      query: gql(`
    query getSiteMap {
      pages(first: 500) {
    nodes {
      uri
     EN:translation(language:EN)
      {
        uri
        language 
        {
          locale
          code
        }
      }
     	 DE:translation(language:DE)
      {
        uri
        language 
        {
          locale
          code
        }
      }
    }
  }
  posts {
    nodes
    {
    uri
      EN:translation(language:EN)
      {
        uri
        language 
        {
          locale
          code
        }
      }
     	 DE:translation(language:DE)
      {
        uri
        language 
        {
          locale
          code
        }
      }
    }
  }
}
    `),
    });
    //@ts-ignore
    paths = data.pages?.nodes.map((ele) => ({
      ...ele,
      uri: ele.uri?.replace("posts", "blog"),
    }));

    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR);
    }
    writeFileSync(`${DATA_DIR}/site_map.json`, JSON.stringify(paths));
  } catch (err) {
    console.error(err);
  }
})();

(async () => {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR);
    }

    // Generate search index

    // Site data
    const siteData = await client.query({
      query: gql(`
      query GetMenus {
        menus {
          
                      nodes {
                        
                        locations
                        menuItems {
                        nodes {  
                        
                        uri
                        label
                        title
                        parentId
                        id
                        target
                        childItems {
                          nodes {
                            title
                            uri
                            label
                          }
                        }
                        }
                        }
                      }
                      
                    }
            }
        `),
    });
    writeFileSync(`${DATA_DIR}/site_data.json`, JSON.stringify(siteData.data));
  } catch (error) {
    console.error(error);
  }
})();
