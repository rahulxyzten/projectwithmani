"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaDownload } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import RelatedProject from "@/components/RelatedProject";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

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
  projectDiscount: number;
  razorpaylink: string;
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
  const [project, setProject] = useState({
    id: "",
    title: "",
    summary: "",
    category: "",
    content: "",
    projectPrice: 0,
    projectDiscount: 0,
    razorpaylink: "",
    thumbnailUrl: "",
    youtubelink: "",
    sourceCodelink: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

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
        projectDiscount: data.projectDiscount,
        razorpaylink: data.razorpaylink,
        thumbnailUrl: data.thumbnail.url,
        youtubelink: data.youtubelink,
        sourceCodelink: data.sourceCodelink || "",
      });
      setCategory(data.category);
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Ensure the Spinner is visible for at least 1 second
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  const finalPrice = Math.floor(
    project.projectPrice -
      (project.projectPrice * project.projectDiscount) / 100
  );

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

  if (loading) {
    return (
      <div className="flex size-full h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const videoID = getYouTubeID(project.youtubelink);

  const handleEdit = async () => {
    router.push(`/update-project?id=${project.id}`);
  };

  const handleBuy = async () => {
    router.push(`/buy?id=${project.id}`);
  };

  const handleDelete = async (project: Project) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this project"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/project/${project.id.toString()}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast("Project deleted successfully");
          router.back();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="py-8 mx-auto w-full max-w-screen-2xl flex-col overflow-hidden ">
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
              <p className="text-white font-semibold mt-2 text-xl sm:text-2xl">
                Final Price:
                <span className="text-blue-400 text-2xl sm:text-3xl ml-2">
                  ₹ {finalPrice}
                </span>
              </p>
            </div>
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

      <RelatedProject relatedProjects={relatedProjects} projectId={projectId} />
    </section>
  );
};

const page = () => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <PageContent />
    </React.Suspense>
  );
};

export default page;
