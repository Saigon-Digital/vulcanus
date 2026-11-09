import {ApolloClient, InMemoryCache} from "@apollo/client";
import {loadEnvConfig} from "@next/env";
import {existsSync, mkdirSync, writeFileSync} from "fs";
import {gql} from "../__generated__";
import {GET_FORM} from "./gql";

loadEnvConfig(process.cwd());
const DATA_DIR = "./src/data";

const endpointUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://holgerk1.sg-host.com";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${endpointUrl}/graphql`,
});

(async () => {
  try {
    let paths: any[] = [];
    // WPGraphQL caps `first` at 100, so page through posts.
    // ponytail: pages (38 today) still one request; paginate them too past 100.
    const posts: any[] = [];
    let after: string | null | undefined = null;
    let data: any;
    do {
      ({data} = await client.query({
      fetchPolicy: "no-cache",
      variables: {after},
      query: gql(`
    query getSiteMap($after: String) {
      pages(first: 100) {
    nodes {
      uri
      slug
      modifiedGmt
    }
  }
  posts (first: 100, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes
    {
    uri
    slug
    modifiedGmt
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
      }));
      posts.push(...(data.posts?.nodes ?? []));
      after = data.posts?.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
    } while (after);
    //@ts-ignore
    paths = data.pages?.nodes.map((ele) => ({
      ...ele,
      uri: ele.uri?.replace("posts", "blog"),
    }));

    const concatPaths = paths.concat(
      posts.map((ele: any) => {
        const localePart =
          ele.language?.code?.toLocaleLowerCase() === "en"
            ? "en/blog/"
            : "blog/";
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
    const footerSetting = await client.query({
      query: gql(`
        query GetFooterSetting {
        siteSettings {
          footerSetting {

            footerTextDe
            footerTextEn

            footerLinkEn {
              url
            }
            footerLinkGe {
              url
            }
            locationLink {
              url
            }
            facebook {
              url
            }
            instagram {
              url
            }
            linkedin {
              url
            }
            xing {
              url
            }

            officeLocationText
            locationLink {
            url
            }
            phone {
              url
              title
            }
            email {
              url
              title
            }
            fax {
              url
              title
            }
          }
        }
        }
        `),
    });

    const formData = await client.query({
      query: GET_FORM,
      variables: {
        formId: "1",
      },
    });

    const siteData = await client.query({
      query: gql(`
      query GetMenus {
        menus {

                      nodes {

                        locations
                        menuItems(first: 200) {
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

    writeFileSync(`${DATA_DIR}/form_data.json`, JSON.stringify(formData.data));

    writeFileSync(
      `${DATA_DIR}/footer_setting.json`,
      JSON.stringify(footerSetting.data)
    );
  } catch (error) {
    console.error(error);
  }
})();
