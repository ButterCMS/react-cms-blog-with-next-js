import Head from "next/head";
import Link from "next/link";

import { getCategories } from "@/lib/api";

export default function Categories({ categories }) {
  return (
    <>
      <Head>
        <title>Post categories</title>
      </Head>
      <h1>Categories</h1>
      <ul>
        {categories.map(({ name, slug }, key) => {
          return (
            <li key={key}>
              <Link href={`/posts/category/${slug}`}>
                <a>{name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();
  return { props: { categories } };
}
