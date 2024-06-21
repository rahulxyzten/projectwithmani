"use client";
import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

interface Project {
  title: string;
  summary: string;
  category: string;
  content: string;
  thumbnail: File;
  youtubelink: string;
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const items = [
    "arduino",
    "electronics",
    "esp8266",
    "raspberrypi",
    "multirotor",
    "esp32",
  ];

  useEffect(() => {
    if (project.category) {
      setSelectedKeys([project.category]);
    }
  }, [project.category]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProject({ ...project, thumbnail: file });
    }
  };

  return (
    <form
      className="flex-center paddings mx-auto max-w-screen-xl flex-col"
      onSubmit={handleSubmit}
    >
      <div className="nav-padding w-full">
        <h1 className="mb-7 heading3 text-white-800">{type} your project ✨</h1>
        <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5">
          <Input
            type="text"
            className="mb-5 "
            variant="underlined"
            label="Title :"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
          <Input
            type="text"
            className="mb-5 "
            variant="underlined"
            label="Summary :"
            value={project.summary}
            onChange={(e) =>
              setProject({ ...project, summary: e.target.value })
            }
          />
          <Select
            variant="underlined"
            label="Select an category :"
            className="max-w-xs mb-5 text-white"
            value={project.category}
            selectedKeys={new Set(selectedKeys)}
            onSelectionChange={(keys) =>
              setSelectedKeys(Array.from(keys) as string[])
            }
            onChange={(e) =>
              setProject({ ...project, category: e.target.value })
            }
          >
            {items.map((item) => (
              <SelectItem className="text-white" key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <p className="mb-2 ml-1 text-sm text-gray-200">Content :</p>
          <Editor
            value={project.content}
            onChange={(value: string) =>
              setProject({ ...project, content: value })
            }
          />

          <p className="mt-5 mb-2 ml-1 text-sm text-gray-200">
            Youtube thumbnail :
          </p>
          <Input
            type="file"
            className="mb-5"
            variant="underlined"
            placeholder=" "
            onChange={handleImage}
          />

          <Input
            type="url"
            className="mb-5 "
            variant="underlined"
            label="Youtube link :"
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
      </div>
    </form>
  );
};

export default Form;
