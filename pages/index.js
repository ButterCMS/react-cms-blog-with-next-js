import Head from "next/head";
import Link from "next/link";

import Container from "@/components/container";
import Header from "@/components/header";
import Layout from "@/components/layout";

export default function Posts() {
  return (
    <Layout>
      <Container>
        <Head>
          <title></title>
        </Head>
        <Header title="ButterCMS. Headless CMS you'll melt over"></Header>
        <div className="bg-gray-50 mb-5 rounded-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:mr-5">
              <span className="block">Blog Engine</span>
              <span className="block text-indigo-600">
                You've got better things to do than building another blog.
              </span>
            </h2>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link href="/posts">
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Preview integration
                  </a>
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="https://buttercms.com/features/#flexiblecontentmodeling-blog-engine"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 mb-5 rounded-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:mr-5">
              <span className="block">Pages</span>
              <span className="block text-indigo-600">
                Build SEO landing pages, knowledge base, news articles, and more
                by using Page Types.
              </span>
            </h2>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link href="/case-studies">
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Preview integration
                  </a>
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="https://buttercms.com/features/#flexiblecontentmodeling-page-types"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 mb-5 rounded-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:mr-5">
              <span className="block">Collections</span>
              <span className="block text-indigo-600">
                Create reusable promotional content and more with Collections.
              </span>
            </h2>
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <Link href="/faq">
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Preview integration
                  </a>
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="https://buttercms.com/features/#flexiblecontentmodeling-collections"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
