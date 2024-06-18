import { connectToDB } from "@/utils/database";
import Project from "@/models/project";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("query");

  try {
    await connectToDB();

    const filter = {};
    if (category) filter.category = category;

    let projects;

    if (category === "all") {
      projects = await Project.find({});
    } else {
      projects = await Project.find(filter);
    }

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all projects", { status: 500 });
  }
};
