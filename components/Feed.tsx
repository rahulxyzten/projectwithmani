"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./SearchForm";
import Filters from "./Filters";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import { Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";

const Feed = () => {
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const category = searchParams.get("category") || "all";
      const query = searchParams.get("query") || "";
      const response = await fetch(
        `/api/project?category=${category}&query=${query}`
      );
      const data = await response.json();
      setProjects(data.reverse());
      setLoading(false);
    };

    fetchProjects();
  }, [searchParams]);

  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "all";

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  return (
    <>
      <section className="nav-padding w-full max-w-screen-xl 3xl:max-w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl sm:bg-banner bg-cover bg-center text-center bg-mobile-banner">
          <motion.h1
            className="sm:heading1 heading2 mb-6 text-center text-white"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            transition={{ duration: 0.5 }}
          >
            Projects With Mani
          </motion.h1>

          <Link
            className="buttonyoutube"
            target="_blank"
            href="https://www.youtube.com/@Projectswithmani"
          >
            <span className="button__icon-wrapper">
              <svg
                width="10"
                className="button__icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 15"
              >
                <path
                  fill="currentColor"
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                ></path>
              </svg>

              <svg
                className="button__icon-svg  button__icon-svg--copy"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                fill="none"
                viewBox="0 0 14 15"
              >
                <path
                  fill="currentColor"
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                ></path>
              </svg>
            </span>
            Explore YouTube
          </Link>
        </div>
        <SearchForm />
      </section>
      <Filters />

      <section className="flex-center mt-6 w-full flex-col sm:mt-20">
        {query === "" && category === "all" ? (
          <Header query={query} category="all" />
        ) : (
          <Header query={query} category={category} />
        )}
        <div className="mt-12 flex w-full flex-wrap justify-center gap-10 sm:gap-6">
          {loading ? (
            <Spinner />
          ) : projects?.length > 0 ? (
            projects.slice(0, 6).map((project: any, index: number) => (
              <motion.div
                key={project._id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <ProjectCard
                  key={project._id}
                  id={project._id}
                  title={project.title}
                  summary={project.summary}
                  content={project.content}
                  category={project.category}
                  imgUrl={project.thumbnail?.url}
                  youtubeLink={project.youtubelink}
                />
              </motion.div>
            ))
          ) : (
            <p className="body-regular text-white-400">No projects found</p>
          )}
        </div>
        {projects.length >= 6 && (
          <ul className="body-regular text-white-400 hover:text-white hover:underline mt-6">
            <Link
              href={{ pathname: "/tutorials", query: { category: category } }}
            >
              Click here to view more Projects
            </Link>
          </ul>
        )}
        <div className="mt-12 flex flex-col items-center">
          <Image
            className="mb-4"
            src="/contact.png"
            alt="logo"
            width={500}
            height={500}
          />
          <a
            href="mailto:contact@projectswithmani.com"
            className="text-white hover:underline text-center text-lg"
          >
            Contact us via email for Any queries : contact@projectswithmani.com
          </a>
        </div>
      </section>
    </>
  );
};

export default Feed;
