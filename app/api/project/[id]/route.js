import { connectToDB } from "@/utils/database";
import Project from "@/models/project";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const project = await Project.findById(params.id);
    if (!project) return new Response("project not found", { status: 404 });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the project", { status: 500 });
  }
};
