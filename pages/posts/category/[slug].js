import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import Layout from "@/components/layout";
import Container from "@/components/container";
import PostPreview from "@/components/post-preview";
import { getCategories, getCategoryWithPosts } from "@/lib/api";
import Header from "@/components/header";

export default function Category({ name, slug, recentPosts }) {
  const router = useRouter();
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        <Head>
          <title>{name} | Post category</title>
        </Head>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <article>
            <Header title={`Blog posts with category "${name}"`}></Header>

            <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-10">
              {recentPosts.map(
                ({
                  slug: postSlug,
                  title: postTitle,
                  featured_image: featuredImage,
                  published,
                  author,
                  summary,
                }) => {
                  return (
                    <PostPreview
                      key={postSlug}
                      title={postTitle}
                      coverImage={featuredImage}
                      date={published}
                      author={author}
                      slug={postSlug}
                      excerpt={summary}
                    />
                  );
                }
              )}
            </div>
          </article>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { name, slug, recent_posts } = await getCategoryWithPosts(params.slug);

  return {
    props: { name, slug, recentPosts: recent_posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();

  return {
    paths:
      categories?.map((category) => `/posts/category/${category.slug}`) || [],
    fallback: true,
  };
}
