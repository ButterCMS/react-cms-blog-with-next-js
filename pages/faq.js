import Head from "next/head";

import Layout from "@/components/layout";
import Container from "@/components/container";
import Header from "@/components/header";
import { getCollectionsItems } from "@/lib/api";

export default function FAQ({ faqItems }) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>FAQ</title>
        </Head>
        <>
          <Header title="FAQ"></Header>
          <ul>
            {faqItems.map(({ question, answer }, index) => {
              return (
                <li key={index} className="mb-5">
                  <div className="text-lg leading-6 font-medium text-gray-900">
                    {question}
                  </div>
                  <div className="mt-4 text-base text-gray-500">{answer}</div>
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
  const { faq_items: faqItems } = await getCollectionsItems(["faq_items"]);
  return { props: { faqItems } };
}
