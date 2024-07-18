"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";


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
    <section className="pt-[130px] flex w-full flex-col items-center px-6">
      <h1 className="text-3xl sm:text-4xl mb-6 font-bold text-center text-white-800 py-5">
        Purchase Your Project Now!
      </h1>
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gradient_purple-blue py-5 max-w-screen-xl">
        {project.title}
      </h1>
      <h1 className="text-4xl font-bold text-center text-white-800 py-5">
        ₹{project.projectPrice}/-
      </h1>

      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <Image
          src="/qr.jpg"
          className="!bg-transparent object-cover rounded-md"
          width={300}
          height={300}
          alt="QR Code for Payment"
        />
        <h2 className="text-2xl font-semibold text-center text-gradient_blue-purple mt-4">
          Scan to Pay - Kotini Mani Kanta
        </h2>
      </div>

      <p className="mt-4 max-w-3xl text-center text-white-800 px-4">
        Your purchase supports continuous valuable content creation and innovation. Join our community and get access to quality projects that can help you succeed.
      </p>

      <p className="mt-4 max-w-3xl text-center text-white-800 px-4">
        Connect with me:
      </p>

      <div className="flex mt-6 space-x-4">
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-500"
        >
          <FaTwitter size={30} />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-700"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600"
        >
          <FaYoutube size={30} />
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-700"
        >
          <FaGithub size={30} />
        </a>
      </div>

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
