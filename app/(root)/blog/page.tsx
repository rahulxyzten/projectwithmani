"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaDownload } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import ProjectCard from "@/components/ProjectCard";

const getYouTubeID = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

interface Project {
  id: string;
  title: string;
  summary: string;
  category: string;
  content: string;
  projectPrice: number;
  thumbnailUrl: string;
  youtubelink: string;
  sourceCodelink: string;
}

const PageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const { data: session } = useSession();

  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [project, setProject] = useState({
    id: "",
    title: "",
    summary: "",
    category: "",
    content: "",
    projectPrice: 0,
    thumbnailUrl: "",
    youtubelink: "",
    sourceCodelink: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        id: data._id,
        title: data.title,
        summary: data.summary,
        category: data.category,
        content: data.content,
        projectPrice: data.projectPrice,
        thumbnailUrl: data.thumbnail.url,
        youtubelink: data.youtubelink,
        sourceCodelink: data.sourceCodelink || "",
      });
      setCategory(data.category);
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  useEffect(() => {
    const getRelatedProjects = async () => {
      if (category) {
        const response = await fetch(`/api/project?category=${category}`);
        const data = await response.json();
        setRelatedProjects(data.reverse());
      }
    };

    getRelatedProjects();
  }, [category]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(3);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const videoID = getYouTubeID(project.youtubelink);

  const handleEdit = async () => {
    router.push(`/update-project?id=${project.id}`);
  };

  const handleBuy = async () => {
    router.push(`/buy?id=${project.id}`);
  };

  const handleDelete = async (project: Project) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/project/${project.id.toString()}`, {
          method: "DELETE",
        });

        router.back();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="py-8 mx-auto w-full max-w-screen-2xl flex-col overflow-hidden">
      <div className="mb-4 mt-24 px-4 sm:px-14 md:px-20 xl:px-40 2xl:px-56 w-full mx-auto relative">
        <div className="flex flex-col justify-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-semibold text-gradient_purple-blue leading-tight">
            {project.title}
          </h2>
          <div className="flex items-center justify-center mt-8">
            <Image
              src={project.thumbnailUrl}
              alt="project thumbnai"
              width={600}
              height={600}
              className="object-cover rounded"
            />
          </div>
          {session?.user.isAdmin && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={handleEdit}
                className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-6 rounded mt-8 active:scale-95"
              >
                Edit this project
              </button>
              <button
                onClick={() => handleDelete(project)}
                className="bg-purple hover:bg-pink translation duration-500 text-white font-bold py-2 px-6 rounded mt-8 active:scale-95"
              >
                Delete this project
              </button>
            </div>
          )}
        </div>

        <div className="flex-col justify-center mb-12">
          <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            YouTube Tutorial:-
          </h2>
          <div className="flex justify-center mt-8 items-center rounded">
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${videoID}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="flex-col justify-center mb-8">
          {/* <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            Content:-
          </h2> */}
          <div
            className=" text-white blog-content"
            dangerouslySetInnerHTML={{ __html: project.content }}
          ></div>
        </div>

        <div className="flex-col justify-center items-center mb-8">
          <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            Source Code:-
          </h2>
          <div className="flex flex-col justify-center items-center mt-4">
            <Link target="_blank" href={project.sourceCodelink}>
              <button className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2">
                <p>G Drive Link</p>
                <FaDownload />
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-col justify-center items-center mb-8">
          <h2 className="text-xl sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
            Buy Complete Project:-
          </h2>
          <div className="flex flex-col justify-center items-center mt-4 sm:mt-6">
            <p className="text-white font-semibold">
              Project price: ₹ {project.projectPrice}
            </p>
            <button
              onClick={handleBuy}
              className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-4 rounded active:scale-95 flex items-center justify-center gap-2"
            >
              <p>Buy Now</p>
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden 2xl:block mx-5 flex-col justify-start mb-12">
        <h2 className="text-xl sm:ml-11 md:ml-16 xl:ml-36 sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
          Related Projects:-
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {relatedProjects?.length > 1 ? (
            relatedProjects
              .filter(
                (relatedProject: any) => relatedProject._id !== project.id
              )
              .slice(0, 3)
              .map((project: any) => (
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
              ))
          ) : (
            <p className="body-regular text-white-400">
              No related projects found
            </p>
          )}
        </div>
      </div>

      <div className="flex 2xl:hidden mx-5 flex-col justify-start mb-12">
        <h2 className="text-xl sm:ml-11 md:ml-16 xl:ml-36 sm:text-3xl flex justify-start text-center font-semibold text-white-800 leading-tight">
          Related Projects:-
        </h2>
        <div className="flex mt-6 flex-col items-center justify-center gap-2">
          <Carousel
            setApi={setApi}
            orientation="horizontal"
            className="max-w-md sm:max-w-lg lg:max-w-4xl"
          >
            <CarouselContent>
              {relatedProjects?.length > 1 ? (
                relatedProjects
                  .filter(
                    (relatedProject: any) => relatedProject._id !== project.id
                  )
                  .slice(0, 3)
                  .map((project: any) => (
                    <CarouselItem className="lg:basis-1/2 flex items-center justify-center">
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
                    </CarouselItem>
                  ))
              ) : (
                <CarouselItem>
                  <p className="body-regular text-white-400">
                    No related projects found
                  </p>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="text-white" />
            <CarouselNext className="text-white" />
          </Carousel>
          <div className="py-2 lg:hidden text-white text-center text-sm">
            project {current} of {count}
          </div>
        </div>
      </div>
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
