import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "@/components/layout";
import Header from "@/components/header";
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

            <Header title="Blog"></Header>

            <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-10">
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
            <div className="text-right mb-10">
              <nav
                className="relative z-0 inline-flex shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {prevPage && (
                  <Link href={`/posts/page/${prevPage}`}>
                    <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Link>
                )}
                {nextPage && (
                  <Link href={`/posts/page/${nextPage}`}>
                    <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </Link>
                )}
              </nav>
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
