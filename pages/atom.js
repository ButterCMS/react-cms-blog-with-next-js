import { getAtomData } from "../lib/api";

export default function Atom({ atom }) {
  return atom;
}

export async function getStaticProps() {
  const atom = await getAtomData();
  return { props: { atom } };
}
