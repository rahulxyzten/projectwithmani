import { connectToDB } from "@/utils/database";
import Project from "@/models/project";

export const POST = async (req) => {
  const {
    title,
    summary,
    content,
    category,
    thumbnail,
    youtubelink,
    dateCreated,
  } = await req.json();

  try {
    await connectToDB();
    const newProject = new Project({
      title,
      summary,
      content,
      category,
      thumbnail: {
        public_id: thumbnail.public_id,
        url: thumbnail.url,
      },
      youtubelink,
      dateCreated,
    });

    await newProject.save();

    return new Response(JSON.stringify(newProject), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new project", { status: 500 });
  }
};
