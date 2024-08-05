import { connectToDB } from "@/utils/database";
import Offer from "@/models/offer";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  try {
    await connectToDB();

    const recentOffer = await Offer.find({});

    return new Response(JSON.stringify(recentOffer), {
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
    return new Response("Failed to fetch recent offer", {
      status: 500,
    });
  }
};
