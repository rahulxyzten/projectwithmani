"use client";
import React from "react";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import Editor from "./Editor";

interface Project {
  title: string;
  summary: string;
  content: string;
  thumbnail: File;
  youtubelink: string;
  category: string;
}

interface Props {
  type: string;
  project: Project;
  setProject: (project: Project) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({
  type,
  project,
  setProject,
  submitting,
  handleSubmit,
}: Props) => {
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProject({ ...project, thumbnail: file });
    }
  };

  return (
    <form
      className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col"
      onSubmit={handleSubmit}
    >
      <div className="nav-padding w-4/5">
        <h1 className="mb-10 heading3 text-white-800">{type} your project</h1>
        <input
          type="text"
          className="bg-black-100 mb-2 w-full px-2 py-2 border-2 border-solid border-x-cyan-50 rounded text-white hover:border-gray-400"
          placeholder={"Title"}
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
        />
        <input
          type="text"
          className="bg-black-100 mb-2 w-full px-2 py-2 border-2 border-solid border-x-cyan-50 rounded text-white hover:border-gray-400"
          placeholder={"Summary"}
          value={project.summary}
          onChange={(e) => setProject({ ...project, summary: e.target.value })}
        />

        <div className="relative inline-flex mb-2">
          <svg
            className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#648299"
              fill-rule="nonzero"
            />
          </svg>
          <select
            className=" border-2 border-solid border-x-cyan-50 rounded text-white h-10 pl-5 pr-10 bg-black-100 hover:border-gray-400 focus:outline-none appearance-none"
            value={project.category}
            onChange={(e) =>
              setProject({ ...project, category: e.target.value })
            }
          >
            <option value="">Choose a category</option>
            <option value="arduino">arduino</option>
            <option value="electronics">electronics</option>
            <option value="esp8266">esp8266</option>
            <option value="raspberrypi">raspberrypi</option>
            <option value="multirotor">multirotor</option>
            <option value="esp32">esp32</option>
          </select>
        </div>

        <Editor
          value={project.content}
          onChange={(value: string) =>
            setProject({ ...project, content: value })
          }
        />
        <input
          type="file"
          className="bg-black-100 mt-2 mb-2 w-full px-2 py-2 border-2 border-solid border-x-cyan-50 rounded text-white hover:border-gray-400"
          name="thumbnail"
          onChange={handleImage}
        />
        <input
          type="url"
          className="bg-black-100 mb-2 w-full px-2 py-2 border-2 border-solid border-x-cyan-50 rounded text-white hover:border-gray-400"
          placeholder={"Youtube link"}
          value={project.youtubelink}
          onChange={(e) =>
            setProject({ ...project, youtubelink: e.target.value })
          }
        />
        <button
          className="cursor-pointer w-full block bg-white-800 border-0 rounded px-2 py-2 mt-1 hover:bg-white-500"
          type="submit"
          disabled={submitting}
        >
          {submitting ? `{type}...` : type}
        </button>
      </div>
    </form>
  );
};

export default Form;
