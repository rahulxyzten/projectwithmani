import React from 'react';
import Image from 'next/image';

interface GalleryCardProps {
  image: string;
  title: string;
  author: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ image, title, author }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black-400 text-black m-4">
      <Image className="w-full" src={image} alt={title} width={400} height={250} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-white">{title}</div>
        <p className="text-white-500 text-base">Made by: {author}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
