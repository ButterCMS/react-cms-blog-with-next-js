import React from "react";
import Link from "next/link";

import { getPostsData } from "@/lib/api";

export default function Posts({ posts, prevPage, nextPage }) {
  return (
    <div>
      {posts.map((post, key) => {
        return (
          <div key={key}>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </div>
        );
      })}
      <br />
      <div>
        {prevPage && (
          <Link href={`/posts/?page=${prevPage}`}>
            <a>Prev</a>
          </Link>
        )}

        {nextPage && (
          <Link href={`/posts/?page=${nextPage}`}>
            <a>Next</a>
          </Link>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page ? parseInt(query.page, 10) : 1;

  const { posts, prevPage, nextPage } = await getPostsData({
    page,
  });
  return {
    props: { posts, prevPage, nextPage },
  };
}
