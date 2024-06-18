import Image from "next/image";
import Link from "next/link";

// interface Props {
//   id: string;
//   title: string;
//   image: string;
//   downloadNumber: number;
//   downloadLink: string;
// }

// const ResouceCard = ({
//   id,
//   title,
//   image,
//   downloadNumber,
//   downloadLink,
// }: Props) => {
//   return (
//     <div className="relative mb-5 max-w-sm rounded-lg border border-black-100 bg-black-200 shadow-md">
//       <Image
//         src="/asset2.webp"
//         className="rounded-t-lg !bg-transparent object-cover"
//         width={384}
//         height={300}
//         alt="thumbnail"
//       />
//       <div className="p-5">
//         <Link href="/blog/001_snapgram-activelesson" target="_blank">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
//             DIY Smoke Detector
//           </h5>
//         </Link>
//         <p className="mb-3 line-clamp-2 font-normal text-white-500">
//           DIY Smoke Detector with Arduino - Real-Time Gas Level Monitoring
//         </p>
//         <a
//           className="text-sm font-medium text-purple"
//           href="/blog/001_snapgram-activelesson"
//         >
//           Read more
//         </a>
//       </div>
//     </div>
//   );
// };

const ResouceCard = () => {
  return (
    <div className="text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 w-full rounded-[10px] border border-black-400 bg-black-200/80 p-3 shadow-video-card sm:w-[410px] sm:p-5">
      <div className="flex flex-col space-y-1.5 p-0 cursor-pointer">
        <div className="relative h-[170px] w-full rounded-md xs:h-[265px] sm:h-[210px]">
        <Image
            src="/asset2.webp"
            className="rounded-t-lg !bg-transparent object-cover"
            width={400}
            height={400}
            alt="arrow"
          />
        </div>
        <h3 className="text-2xl font-semibold leading-none tracking-tight body-semibold line-clamp-2 w-full pt-5 text-left text-white">
          Build and Deploy a Fully Responsive Restaurant Website with Modern UI
          and UX in ReactJS
        </h3>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 p-0">
        <p className="body-medium capitalize text-white-500">Arduino</p>
        <Link href="/blog" className="flex-center text-gradient_purple-blue body-semibold gap-1.5">
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

export default ResouceCard;
