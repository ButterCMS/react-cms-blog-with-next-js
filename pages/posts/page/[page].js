import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "@/components/layout";
import Container from "@/components/container";
import PostPreview from "@/components/post-preview";
import { getPostsData, getAllPostsPaginated } from "@/lib/api";

export default function Posts({ posts, prevPage, nextPage }) {
  const router = useRouter();
  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <Head>
              <title>Blog posts</title>
              <meta
                name="description"
                content="Blog posts fetched from ButterCMS"
              />
            </Head>

            <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.featured_image}
                  date={post.published}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.summary}
                />
              ))}
            </div>
            <div>
              {prevPage && (
                <Link href={`/posts/page/${prevPage}`}>
                  <a>Prev</a>
                </Link>
              )}

              {nextPage && (
                <Link href={`/posts/page/${nextPage}`}>
                  <a>Next</a>
                </Link>
              )}
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);
  const { posts, prevPage, nextPage } = await getPostsData(page);

  return {
    props: { posts, prevPage, nextPage },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsPaginated();
  const paths = Object.keys(allPosts).map(
    (pageIndex) => `/posts/page/${parseInt(pageIndex, 10) + 1}`
  );

  return {
    paths,
    fallback: true,
  };
}
