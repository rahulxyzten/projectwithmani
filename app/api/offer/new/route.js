import { connectToDB } from "@/utils/database";
import Offer from "@/models/offer";

export const POST = async (req) => {
  const { searchParams } = new URL(req.url);
  const { offerDescription, cover, youtubelink } = await req.json();

  try {
    await connectToDB();
    const newOffer = new Offer({
      offerDescription,
      youtubelink: youtubelink,
      cover: {
        public_id: cover.public_id,
        url: cover.url,
      },
    });

    await newOffer.save();

    return new Response(JSON.stringify(newOffer), {
      status: 201,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Failed to create a new offer", { status: 500 });
  }
};
