import { getCollection } from "astro:content";
import generateOgImage from "@utils/generateOgImage";
import type { APIRoute } from "astro";

// export const get: APIRoute = async ({ params }) => ({
//   body: await generateOgImage(params.ogTitle),
// });

export const get: APIRoute = async ({ params }) => {
  const body = await generateOgImage(params.ogTitle);
  return new Response(body, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
};
const postImportResult = await getCollection("blog", ({ data }) => !data.draft);
const posts = Object.values(postImportResult);

export function getStaticPaths() {
  return posts
    .filter(({ data }) => !data.ogImage)
    .map(({ data }) => ({
      params: { ogTitle: data.title },
    }));
}
