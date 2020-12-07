import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

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
              <div
                style={{
                  position: "relative",
                  width: "300px",
                  height: "300px",
                }}
              >
                <Link href={`/case-studies/${slug}`}>
                  <a>
                    <Image
                      alt={fields.headline}
                      src={fields.customer_logo}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      className="rounded-lg"
                    />
                  </a>
                </Link>
              </div>
              <div>
                <h3 className="text-3xl mb-3 mt-3 leading-snug">
                  <Link href={`/case-studies/${slug}`}>
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
