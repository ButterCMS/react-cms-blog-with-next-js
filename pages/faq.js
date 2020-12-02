import Head from "next/head";

import Layout from "@/components/layout";
import Container from "@/components/container";
import { getCollectionsItems } from "@/lib/api";

export default function FAQ({ collectionsItems }) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>FAQ</title>
        </Head>
        <>
          <h1>FAQ</h1>
          <ul>
            {collectionsItems.faq_items.map(({ question, answer }, key) => {
              return (
                <li key={key}>
                  <h4>{question}</h4>
                  <p>{answer}</p>
                </li>
              );
            })}
          </ul>
        </>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const collectionsItems = await getCollectionsItems(["faq_items"]);
  return { props: { collectionsItems } };
}
