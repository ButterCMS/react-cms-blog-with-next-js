export default function Header({ title }) {
  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight px-4 mb-20 mt-8">
      {title}
    </h2>
  );
}
