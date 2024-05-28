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
      pages(first: 1000) {
    nodes {
      uri
      slug
    }
  }
  posts (first:500) {
    nodes
    {
    uri
    slug
    language {
        code
      }
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

    const concatPaths = paths.concat(
      data.posts?.nodes.map((ele: any) => {
        const localePart =
          ele.language?.code?.toLocaleLowerCase() === "en"
            ? "en/blog/"
            : "weblog/";
        return {...ele, uri: `/${localePart}${ele.slug}`};
      })
    );

    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR);
    }
    writeFileSync(`${DATA_DIR}/site_map.json`, JSON.stringify(concatPaths));
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
