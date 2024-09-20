import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube, FaGithub, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";


const page = () => {
  return (
    <section className="pt-[130px] flex w-full flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-white-800 pb-7">
        About us 
      </h1>

      <div className="flex flex-col items-center ">
        <Image
          src="/mani.jpg"
          className="rounded-full !bg-transparent object-cover transition-transform duration-500 ease-in-out transform hover:scale-105"
          width={350}
          height={350}
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
        YouTube. Additionally, I offer ready made projects for students tailored
        to their requirements at affordable and competitive prices.
      </p>

      <p className="mt-4 max-w-3xl text-center text-white px-4">
        Connect with me:
      </p>

      <div className="flex mt-6 space-x-4">
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
        <Link
          href="https://wa.me/+917847014067"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-600"
        >
          <FaWhatsapp size={30} />
        </Link>
        <Link
          href="mailto:contact@projectswithmani.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-red-500"
        >
          <SiGmail size={30} />
        </Link>
      </div>

      <div className="py-12"></div>
    </section>
  );
};

export default page;
