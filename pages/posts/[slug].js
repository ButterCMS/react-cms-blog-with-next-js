import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";

import Container from "@/components/container";
import PostBody from "@/components/post-body";
import PostHeader from "@/components/post-header";
import Layout from "@/components/layout";
import { getAllPostsPaginated, getPost } from "@/lib/api";

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.seo_title}</title>
                <meta name="description" content={post.meta_description} />
                <meta name="og:image" content={post.featured_image} />
              </Head>

              <PostHeader
                title={post.title}
                coverImage={post.featured_image}
                date={post.published}
                author={post.author}
                categories={post.categories}
              />
              <PostBody content={post.body} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsPaginated(100);
  const paths = Object.entries(allPosts).reduce((res, [pageIndex, posts]) => {
    const pagePaths = posts.map((post) => `/posts/${post.slug}`);
    return [...res, ...pagePaths];
  }, []);

  return {
    paths,
    fallback: true,
  };
}
