import Butter from "buttercms";
const butter = Butter(process.env.BUTTER_CMS_API_KEY);

export async function getPreviewPostBySlug(slug) {
  const postResponse = await butter.post.retrieve(slug, {
    preview: 1,
  });
  return postResponse?.data?.data;
}

export async function getAllPosts() {
  // https://buttercms.com/docs/api/node?javascript#get-your-blog-posts
  const response = await butter.post.list();
  return response?.data?.data;
}

export async function getCategories() {
  const categories = await butter.category.list();
  return categories?.data?.data;
}

export async function getCategoryWithPosts(slug) {
  const response = await butter.category.retrieve(slug, {
    include: "recent_posts",
  });
  return response?.data?.data;
}

export async function getAtomData() {
  const atom = await butter.feed.retrieve("atom");
  return atom?.data?.data;
}

export async function getRssData() {
  const rss = await butter.feed.retrieve("rss");
  return rss?.data?.data;
}

export async function getSitemapData() {
  const sitemap = await butter.feed.retrieve("sitemap");
  return sitemap?.data?.data;
}

export async function getPostAndMorePosts(slug, preview) {
  const postResponse = await butter.post.retrieve(slug, {
    preview: preview ? 1 : 0,
  });
  const postListResponse = await butter.post.list();
  return {
    post: postResponse?.data?.data,
    morePosts: postListResponse?.data?.data.filter(
      ({ slug: postSlug }) => postSlug !== slug
    ),
  };
}
