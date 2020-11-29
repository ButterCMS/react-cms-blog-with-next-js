import { getRssData } from "@/lib/api";

export default function Rss({ rss }) {
  return rss;
}

export async function getStaticProps() {
  const rss = await getRssData();
  return { props: { rss } };
}
