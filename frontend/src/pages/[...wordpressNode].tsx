
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

  // Blog posts used to live at "/<slug>" and "/en/<slug>" (old WordPress
  // permalinks), and Google still knows those URLs. If nothing exists at the
  // path but a post with that slug does, 301 to the post.
  const params = ctx.params?.wordpressNode;
  if ("notFound" in result && Array.isArray(params) && params.length === 1) {
    const postUri = await findPostUri(params[0], ctx.locale === "en");
    if (postUri) {
      return {redirect: {destination: postUri, permanent: true}, revalidate: 3600};
    }
  }

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

// Real uri of the post with this slug, preferring the requested language
// ("/en/fertigungsverfahren" has a German slug, so it falls back to /blog/...).
async function findPostUri(slug: string, en: boolean): Promise<string | null> {
  const uris = en ? [`/en/blog/${slug}/`, `/blog/${slug}/`] : [`/blog/${slug}/`, `/en/blog/${slug}/`];
  const query = `query($a:String!,$b:String!){a:nodeByUri(uri:$a){__typename uri} b:nodeByUri(uri:$b){__typename uri}}`;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({query, variables: {a: uris[0], b: uris[1]}}),
    });
    const {data} = await res.json();
    const node = [data?.a, data?.b].find((n) => n?.__typename === "Post");
    return cleanUri(node?.uri) ?? null;
  } catch {
    return null; // WordPress unreachable: fall through to the normal 404
  }
}

export const getStaticPaths: GetStaticPaths = (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
