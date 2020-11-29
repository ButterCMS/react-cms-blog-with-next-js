import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";

import Layout from "@/components/layout";
import Container from "@/components/container";
import { getPagesByType, getPageWithType } from "@/lib/api";

const caseStudiesType = "customer_case_study";
export default function caseStudy({ page }) {
  const router = useRouter();
  if (!router.isFallback && !page?.slug) {
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
              <title>{page.fields.seo_title}</title>
            </Head>

            <div>
              <img
                src={page.fields.customer_logo}
                alt=""
                height="124"
                width="124"
              />
            </div>
            <h1>{page.fields.headline}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: page.fields.testimonial }}
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
    props: { page },
  };
}

export async function getStaticPaths() {
  const caseStudiesPages = await getPagesByType(caseStudiesType);

  return {
    paths: caseStudiesPages?.map((page) => `/case-studies/${page.slug}`) || [],
    fallback: true,
  };
}
