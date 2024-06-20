"use client";
import React, { useState } from 'react';
import GalleryCard from '@/components/Gallerycard';
import Image from 'next/image';
import Link from 'next/link';

const initialProjects = [
  {
    image: '/asset2.webp',
    title: 'DIY Cheap Arduino',
    author: 'vivek saiyan',
  },
  {
    image: '/asset4.webp',
    title: 'Home automation',
    author: 'Rahul bhai',
  },
  {
    image: '/asset3.webp',
    title: 'DIY Cheap Arduino',
    author: 'vivek saiyan',
  },
  {
    image: '/asset5.webp',
    title: 'Home automation',
    author: 'Rahul bhai',
  },
  {
    image: '/asset5.webp',
    title: 'Home automation',
    author: 'Rahul bhai',
  },
  {
    image: '/asset5.webp',
    title: 'Home automation',
    author: 'Rahul bhai',
  },
  {
    image: '/asset5.webp',
    title: 'Home automation',
    author: 'Rahul bhai',
  },
  // As an example
  // Will make them at create which will be done by admin itself
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <section className="pt-[150px] flex w-full flex-col items-center">

    <div className="flex flex-col items-center bg-black-100 text-white min-h-screen">
      <h1 className="text-4xl font-bold my-8 text-center">This projects are made by creators who learnt from my Tutorials</h1>
      <Link href="https://forms.gle/your-google-form-link" passHref>
        <button className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-4 rounded mb-8">
          Upload your Project Image
        </button>
      </Link>
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {projects.slice(0, visibleCount).map((project, index) => (
          <GalleryCard key={index} image={project.image} title={project.title} author={project.author} />
        ))}
      </div>
      {visibleCount < projects.length && (
        <button
          onClick={handleLoadMore}
          className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-4 rounded my-8"
        >
          Load More
        </button>
      )}
    </div>
    </section>
  );
};

export default Projects;
