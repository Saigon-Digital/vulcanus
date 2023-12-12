import {gql} from "@/__generated__";
import {MenuLocationEnum} from "@/__generated__/graphql";
import {createApolloClient} from "@faustwp/core/dist/cjs/client";

const menuLocations = {
  de: {
    header: MenuLocationEnum.Header,
    footer: MenuLocationEnum.Footer,
  },
  en: {
    header: MenuLocationEnum.HeaderEn,
    footer: MenuLocationEnum.FooterEn,
  },
};

const client = createApolloClient();

async function getMenuItems(location: MenuLocationEnum) {
  return await client.query({
    query: gql(`
            query MenuItems($location: MenuLocationEnum!) {
              menuItems(where: { location: $location }) {
                nodes {
                  label
                  target
                  uri
                }
              }
            }
          `),
    variables: {
      location,
    },
  });
}

export async function getGlobalSiteData(locale: string | undefined) {
  const menuLocation = menuLocations[(locale as "de" | "en") || "de"];
  const headerMenu = await getMenuItems(menuLocation.header);
  const footerMenu = await getMenuItems(menuLocation.footer);

  return {
    headerMenu: headerMenu.data,
    footerMenu: footerMenu.data,
  };
}
