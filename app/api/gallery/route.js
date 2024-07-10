import { connectToDB } from "@/utils/database";
import Gallery from "@/models/gallery";

export const GET = async (request) => {
  try {
    await connectToDB();

    const galleryProjects = await Gallery.find({});

    return new Response(JSON.stringify(galleryProjects), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch all gallery Projects", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
};
