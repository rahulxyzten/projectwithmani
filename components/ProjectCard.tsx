import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imgUrl: string;
  youtubeLink: string;
}

const ProjectCard = ({
  id,
  title,
  summary,
  content,
  category,
  imgUrl,
  youtubeLink,
}: Props) => {
  return (
    <div className="text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 w-full rounded-[10px] border border-black-400 bg-black-200/80 p-3 shadow-video-card sm:w-[410px] sm:p-5">
      <div className="flex flex-col space-y-1.5 p-0 cursor-pointer">
        <div className="relative h-[170px] w-full rounded-md xs:h-[265px] sm:h-[210px]">
          <Image
            src={imgUrl}
            className="rounded-t-lg !bg-transparent object-cover"
            width={400}
            height={400}
            alt="thumbnail"
          />
        </div>
        <h3 className="text-2xl font-semibold leading-none tracking-tight body-semibold line-clamp-2 w-full pt-5 text-left text-white">
          {title}
        </h3>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 p-0">
        <p className="body-medium capitalize text-white-500">{category}</p>
        <Link
          href={youtubeLink}
          target="_blank"
          className="flex-center text-gradient_purple-blue body-semibold gap-1.5"
        >
          Read More
          <Image
            src="/arrow-blue.svg"
            className="rounded-t-lg !bg-transparent object-cover"
            width={13}
            height={0}
            alt="arrow"
          />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
