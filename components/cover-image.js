import Link from "next/link";
import Image from "next/image";

export default function CoverImage({ title, url, slug }) {
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>
            <div style={{ position: "relative", height: "300px" }}>
              <Image
                alt={title}
                src={url}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-lg"
              />
            </div>
          </a>
        </Link>
      ) : (
        <div style={{ position: "relative", height: "300px" }}>
          <Image
            alt={title}
            src={url}
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
