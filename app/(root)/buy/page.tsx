"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { motion } from "framer-motion";

const PageContent = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState({
    title: "",
    projectPrice: 0,
    projectDiscount: 0,
    razorpaylink: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        title: data.title,
        projectPrice: data.projectPrice,
        projectDiscount: data.projectDiscount,
        razorpaylink: data.razorpaylink,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const finalPrice = Math.floor(
    project.projectPrice -
      (project.projectPrice * project.projectDiscount) / 100
  );

  return (
    <section className="pt-[130px] flex w-full flex-col items-center px-6">
      <h1 className="text-3xl sm:text-4xl mb-4 font-bold text-center text-white-800 py-5">
        Purchase Your Project Now!
      </h1>
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gradient_purple-blue py-5 max-w-screen-xl">
        {project.title}
      </h1>
      <motion.div
        className="flex flex-col justify-center items-center mt-4 sm:mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <p className="text-white font-semibold">
            Project price:
            <span
              className={`text-lg ${
                project.projectDiscount ? "line-through text-red-500" : ""
              } ml-2`}
            >
              ₹ {project.projectPrice}
            </span>
          </p>
          {project.projectDiscount > 0 && (
            <p className="text-white font-semibold">
              Project discount:
              <span className="text-green-500 ml-2">
                {project.projectDiscount}%
              </span>
            </p>
          )}
          <p className="text-white font-semibold text-2xl py-5">
            Final Price:
            <span className="text-blue-400 text-3xl ml-2">
              ₹ {finalPrice}
            </span>
          </p>
        </div>
      </motion.div>

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

      <div className="flex flex-col justify-center items-center">
        <p className=" text-white-800 mt-4">After Payment is done, send the Screenshot in the below Whatsapp Number by clicking it</p>
        <Link target="_blank" href="https://wa.me/+917655082651">
          <button className="bg-green-400 w-40 hover:bg-green-700 transition duration-500 text-white font-bold py-2 px-4 mt-4 rounded active:scale-95 flex items-center justify-center gap-2">
            <p>Whatsapp</p>
            <FaWhatsapp />
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className=" text-white font-bold mt-6">--or pay with--</p>
        <Link target="_blank" href={project.razorpaylink}>
          <button className="bg-blue-400 w-40 hover:bg-blue-700 transition duration-500 text-white font-bold py-2 px-4 mt-4 rounded active:scale-95 flex items-center justify-center gap-2">
            <p>Razorpay</p>
            <SiRazorpay />
          </button>
        </Link>
      </div>

      <p className="mt-8 max-w-3xl text-center text-white-800 px-4">
        Your purchase supports continuous valuable content creation and
        innovation. Join our community and get access to quality projects that
        can help you succeed.
      </p>

      <p className="mt-4 max-w-3xl text-center text-white-800 px-4">
        Connect with me:
      </p>

      <div className="flex mt-4 space-x-4">
        <Link
          href="https://insta.openinapp.co/d9uo8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-400"
        >
          <FaInstagram size={30} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/kotini-mani-kanta-72773b211?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-700"
        >
          <FaLinkedin size={30} />
        </Link>
        <Link
          href="https://www.youtube.com/@Projectswithmani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-600"
        >
          <FaYoutube size={30} />
        </Link>
        <Link
          href="https://github.com/projectswithmani"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-700"
        >
          <FaGithub size={30} />
        </Link>
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
