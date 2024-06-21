"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [project, setProject] = useState({
    title: "",
    summary: "",
    category: "",
    content: "",
    thumbnailUrl: "",
    youtubelink: "",
  });

  useEffect(() => {
    const getProjectDetails = async () => {
      const response = await fetch(`/api/project/${projectId}`);
      const data = await response.json();
      setProject({
        title: data.title,
        summary: data.summary,
        category: data.category,
        content: data.content,
        thumbnailUrl: data.thumbnail.url,
        youtubelink: data.youtubelink,
      });
    };

    if (projectId) getProjectDetails();
  }, [projectId]);

  return (
    <section className=" pt-[160px] flex w-full flex-col items-center">
      <div className="container mx-auto py-8 px-4">
        {/* <h1 className="text-4xl font-bold text-center mb-8 text-purple">
          {project.title}
        </h1> */}

        <div className="flex justify-center mb-8">
          <Image
            src={project.thumbnailUrl}
            alt="Project Image"
            width={800}
            height={600}
            className="rounded"
          />
        </div>

        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">title</h2>
          <p className="text-sm font-bold mb-4">{project.title}</p>
        </section>
        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">summary</h2>
          <p className="text-sm font-bold mb-4">{project.summary}</p>
        </section>
        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">category</h2>
          <p className="text-sm font-bold mb-4">{project.category}</p>
        </section>
        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">content</h2>
          <p
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: project.content }}
          ></p>
        </section>
        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">youtubelink</h2>
          <p className="text-sm font-bold mb-4">{project.youtubelink}</p>
        </section>

        <div className="flex justify-center mb-8">
          {/* <YouTube videoId='url here' className="w-full max-w-2xl" /> */}
          {/* <iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/KGZqndaJB4A?si=ghH4BL62uEoUfyb8"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </div>

        {/* <p className="mb-8 text-white" dangerouslySetInnerHTML={{ __html: project.content }}></p> */}

        {/* <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
          <ul>
            <li>Start Your FREE Altium Trial</li>
            <li>
              Altium PCB Designer:{" "}
              <Link href="https://www.altium.com/yt/ViralScience">
                https://www.altium.com/yt/ViralScience
              </Link>
            </li>
            <li>
              Altium 365:{" "}
              <Link href="https://www.altium.com/altium-365">
                https://www.altium.com/altium-365
              </Link>
            </li>
            <li>
              Octopart components search engine:{" "}
              <Link href="https://octopart.com">https://octopart.com</Link>
            </li>
          </ul>
        </section>

        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Materials</h2>
          <ul>
            <li>Nodemcu ESP8266 board</li>
            <li>RC522 RFID Reader</li>
            <li>16x2 I2c LCD Display</li>
            <li>RFID Tags</li>
            <li>Buzzer</li>
            <li>BreadBoard</li>
            <li>Jumper Wires</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Circuit Diagram
          </h2>
          <div className="flex justify-center">
            <Image
              src="/asset3.webp" // replace with your image path
              alt="Circuit Diagram"
              width={800}
              height={600}
              className="rounded"
            />
          </div>
        </section>

        <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Code File</h2>
          <p>Purchase the code file to get the complete implementation.</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded">
            Buy Now
          </button>
        </section> */}

        {/* <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Comments</h2> */}
        {/* Implement your comment section here */}
        {/* </section> */}

        {/* <section className="mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <ul>
            <li>
              <Link href="/related-post-1">Related Project 1</Link>
            </li>
            <li>
              <Link href="/related-post-2">Related Project 2</Link>
            </li>
            <li>
              <Link href="/related-post-3">Related Project 3</Link>
            </li>
          </ul>
        </section> */}
      </div>
    </section>
  );
};

export default page;
