import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/layout";
import Header from "@/components/header";
import Container from "@/components/container";
import { getCategories } from "@/lib/api";

export default function Categories({ categories }) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>Post categories</title>
        </Head>
        <Header title="Posts categories"></Header>
        <ul>
          {categories.map(({ name, slug }, key) => {
            return (
              <li key={key} className="mb-5">
                <Link href={`/posts/category/${slug}`}>
                  <a className="text-lg leading-6 font-medium">{name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();
  return { props: { categories } };
}
