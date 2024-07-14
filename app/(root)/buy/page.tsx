"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const PageContent = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState({
    title: "",
    projectPrice: 0,
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        title: data.title,
        projectPrice: data.projectPrice,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  return (
    <section className="pt-[130px] flex w-full flex-col items-center">
      <h1 className="text-4xl mb-6 font-bold text-center text-white-800 py-5">
        Buy the project
      </h1>
      <h1 className="text-4xl font-bold text-center text-white-800 py-5">
        {project.title}
      </h1>
      <h1 className="text-4xl font-bold text-center text-white-800 py-5">
        {project.projectPrice}
      </h1>

      <div className="flex flex-col items-center ">
        <Image
          src="/mani.jpg"
          className="rounded-full !bg-transparent object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          width={400}
          height={400}
          alt="Kotini Mani Kanta"
        />
        <h2 className="text-2xl font-semibold text-center text-gradient_blue-purple mt-4">
          Kotini Mani Kanta
        </h2>
      </div>

      <p className="mt-4 max-w-3xl text-center text-white px-4">
        I am an electronics enthusiast with a B.Tech in Electronics and
        Communication Engineering. Driven by my passion for technology, I share
        my knowledge and experiences through my YouTube channel. Regardless of
        the outcome, I am committed to consistently creating valuable content on
        YouTube. Additionally, I offer readymade projects for students tailored
        to their requirements at affordable and competitive prices.
      </p>

      <p className="mt-4 max-w-3xl text-center text-white px-4">
        Connect with me:
      </p>

      <div className="py-12"></div>
    </section>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default page;
