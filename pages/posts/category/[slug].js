import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "@/components/layout";
import Container from "@/components/container";
import { getCategories, getCategoryWithPosts } from "@/lib/api";

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
            <h1>{name}</h1>
            <div>
              {recentPosts.map(({ slug: postSlug, title: postTitle }, key) => {
                return (
                  <div key={key}>
                    <Link href={`/posts/${postSlug}`}>
                      <a>{postTitle}</a>
                    </Link>
                  </div>
                );
              })}
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
