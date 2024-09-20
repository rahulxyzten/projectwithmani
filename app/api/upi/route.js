import { connectToDB } from "@/utils/database";
import Upi from "@/models/upi";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  try {
    await connectToDB();

    const scanner = await Upi.find({});

    return new Response(JSON.stringify(scanner), {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Failed to fetch scanner image", {
      status: 500,
    });
  }
};
