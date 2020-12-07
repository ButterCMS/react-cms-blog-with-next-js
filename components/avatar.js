import Image from "next/image";

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <div className=" mr-4">
        <Image
          src={picture}
          height="48px"
          width="48px"
          className="w-12 h-12 rounded-full grayscale"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
