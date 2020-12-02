import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "@/components/layout";
import Date from "@/components/date";
import Header from "@/components/header";
import Container from "@/components/container";
import { getPagesByType, getPageWithType } from "@/lib/api";

export default function caseStudy({
  slug,
  name,
  customerLogo,
  headline,
  customerIndustry,
  customerSubindustry,
  studyBody,
  studyDate,
  customerReviewedCaseStudy,
}) {
  const router = useRouter();
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <article>
            <Head>
              <title>{name}</title>
            </Head>
            <Header title={headline}></Header>
            <div className="grid grid-flow-col auto-cols-max gap-4 mb-5">
              <img
                class="rounded-lg"
                style={{ maxHeight: "200px" }}
                src={customerLogo}
              />
              <div>
                <div>
                  Study date: <Date dateString={studyDate}></Date>
                </div>
                <div>Industry: {customerIndustry}</div>
                <div>Subindustry: {customerSubindustry}</div>
                {customerReviewedCaseStudy && <div>Reviewed by customer </div>}
              </div>
            </div>
            <div
              class="mb-10"
              dangerouslySetInnerHTML={{ __html: studyBody }}
            />
          </article>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = await getPageWithType("customer_case_study", params.slug);

  return {
    props: {
      slug: page.slug,
      name: page.name,
      headline: page.fields.headline,
      customerLogo: page.fields.customer_logo,
      customerIndustry: page.fields.customer_industry,
      customerSubindustry: page.fields.customer_subindustry,
      studyBody: page.fields.study_body,
      studyDate: page.fields.study_date,
      customerReviewedCaseStudy: page.fields.customer_reviewed_case_study,
    },
  };
}

export async function getStaticPaths() {
  const caseStudiesPages = await getPagesByType("customer_case_study");

  return {
    paths: caseStudiesPages?.map((page) => `/case-studies/${page.slug}`) || [],
    fallback: true,
  };
}
