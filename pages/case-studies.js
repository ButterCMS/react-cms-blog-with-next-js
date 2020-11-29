import Link from "next/link";
import Head from "next/head";

import Layout from "@/components/layout";
import Container from "@/components/container";
import { getPagesByType } from "@/lib/api";

export default function caseStudies({ pages }) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>Case studies</title>
        </Head>
        {pages.map(({ slug, fields }, key) => {
          return (
            <div key={key}>
              <img src={fields.customer_logo} height="40" width="40" />
              <Link href={`/case-studies/${slug}`}>
                <a>{fields.headline}</a>
              </Link>
            </div>
          );
        })}
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const pages = await getPagesByType("customer_case_study");

  return { props: { pages } };
}
