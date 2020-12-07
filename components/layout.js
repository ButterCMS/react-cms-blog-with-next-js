import Link from "next/link";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="min-h-screen mb-20">
        <div className="relative pt-6 pb-6 px-4 sm:px-6 lg:px-8">
          <nav
            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
            aria-label="Global"
          >
            <div className="ml-10 pr-4 space-x-8">
              <Link href="/">
                <a className="font-medium text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/posts">
                <a className="font-medium text-gray-500 hover:text-gray-900">
                  Blog
                </a>
              </Link>
              <Link href="/case-studies">
                <a className="font-medium text-gray-500 hover:text-gray-900">
                  Pages with types
                </a>
              </Link>
              <Link href="/faq">
                <a className="font-medium text-gray-500 hover:text-gray-900">
                  Collections
                </a>
              </Link>
            </div>
          </nav>
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
