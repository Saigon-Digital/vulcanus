
import {WordPressTemplateProps} from "@/types";
import {WordPressTemplate, getWordPressProps} from "@faustwp/core";
import {GetStaticPaths, GetStaticProps} from "next";
import {cleanUri} from "@/utils/seoUrls";
export default function Page(props: WordPressTemplateProps) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const result = await getWordPressProps({
    ctx,
  });

  // WordPress resolves a page by uri without checking the language, so e.g.
  // "/en/dienstleistungen/frasen" (a German slug under /en) returns the German
  // page, and the template then shows its English translation. That makes one
  // page reachable at two URLs. If the requested path is not the page's real
  // URL in this language, redirect to the real one.
  if ("props" in result && !ctx.preview) {
    const data = (result.props as any)?.__TEMPLATE_QUERY_DATA__;
    const realPath = cleanUri(data?.page?.translation?.uri);

    if (realPath !== undefined) {
      const params = ctx.params?.wordpressNode;
      const requested = Array.isArray(params) ? `/${params.join("/")}` : "/";
      const requestedPath =
        ctx.locale && ctx.locale !== ctx.defaultLocale
          ? `/${ctx.locale}${requested}`
          : requested;

      let decodedRealPath = realPath;
      try {
        decodedRealPath = decodeURI(realPath);
      } catch {
        // malformed percent-encoding: compare the raw value instead of crashing
      }

      if (cleanUri(requestedPath) !== decodedRealPath) {
        return {redirect: {destination: realPath || "/", permanent: true}};
      }
    }
  }

  return result;
};

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
