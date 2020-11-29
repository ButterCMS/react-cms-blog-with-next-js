import { getSitemapData } from "../lib/api";

export default function Sitemap({ sitemap }) {
  return sitemap;
}

export async function getStaticProps() {
  const sitemap = await getSitemapData();
  return { props: { sitemap } };
}
