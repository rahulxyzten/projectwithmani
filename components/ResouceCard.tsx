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
    <div className="relative mb-5 max-w-sm rounded-lg border border-black-100 bg-black-200 shadow-md">
      <Image
        src="/asset2.webp"
        className="rounded-t-lg !bg-transparent object-cover"
        width={384}
        height={300}
        alt="thumbnail"
      />
      <div className="p-5">
        <Link href="/blog/001_snapgram-activelesson" target="_blank">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            DIY Smoke Detector
          </h5>
        </Link>
        <p className="mb-3 line-clamp-2 font-normal text-white-500">
          DIY Smoke Detector with Arduino - Real-Time Gas Level Monitoring
        </p>
        <div className="flex flex-row-reverse mr-3">
          <Link
            className="text-sm font-medium text-purple"
            href="/blog/001_snapgram-activelesson"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResouceCard;
