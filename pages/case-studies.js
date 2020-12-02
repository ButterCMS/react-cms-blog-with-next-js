import Link from "next/link";
import Head from "next/head";

import Header from "@/components/header";
import Layout from "@/components/layout";
import Date from "@/components/date";
import Container from "@/components/container";
import { getPagesByType } from "@/lib/api";

export default function caseStudies({ pages }) {
  return (
    <Layout>
      <Container>
        <Head>
          <title>Case studies</title>
        </Head>
        <Header title="Case studies"></Header>

        {pages.map(({ slug, fields }, key) => {
          return (
            <div
              key={key}
              className="grid grid-flow-col auto-rows-max gap-4 mb-5"
            >
              <img
                class="rounded-lg"
                style={{ maxHeight: "150px" }}
                src={fields.customer_logo}
              />
              <div>
                <h3 className="text-3xl mb-3 mt-3 leading-snug">
                  <Link
                    as={`/case-studies/${slug}`}
                    href="/case-studies/[slug]"
                  >
                    <a className="hover:underline">{fields.headline}</a>
                  </Link>
                </h3>
                Study date: <Date dateString={fields.study_date}></Date>
                {fields.customer_reviewed_case_study && (
                  <div>Reviewed by customer </div>
                )}
              </div>
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
