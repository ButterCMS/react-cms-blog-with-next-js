import Link from "next/link";

import Avatar from "@/components/avatar";
import Date from "@/components/date";
import CoverImage from "@/components/cover-image";
import PostTitle from "@/components/post-title";

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
  categories,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar
          name={`${author.first_name} ${author.last_name}`}
          picture={author.profile_image}
        />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar
            name={`${author.first_name} ${author.last_name}`}
            picture={author.profile_image}
          />
        </div>
        <div className="mb-6 text-lg">
          {categories.map(({ name, slug }) => {
            return (
              <Link href={`/posts/category/${slug}`} key={slug}>
                <a className="mr-2 hover:underline leading-snug">{name}</a>
              </Link>
            );
          })}
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
