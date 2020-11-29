import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";

import Container from "@/components/container";
import PostBody from "@/components/post-body";
import PostHeader from "@/components/post-header";
import Layout from "@/components/layout";
import { getPostsData, getPost } from "@/lib/api";

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
              />
              <PostBody content={post.body} />
              <h3>Categories</h3>
              {post.categories.map(({ name, slug }, key) => {
                return (
                  <div key={key}>
                    <Link href={`/posts/category/${slug}`}>
                      <a>{name}</a>
                    </Link>
                  </div>
                );
              })}
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
  const { posts } = await getPostsData();
  return {
    paths: posts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
}
