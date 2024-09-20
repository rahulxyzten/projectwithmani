import { connectToDB } from "@/utils/database";
import Upi from "@/models/upi";

export const POST = async (req) => {
  const { searchParams } = new URL(req.url);
  const { scannerImg } = await req.json();

  try {
    await connectToDB();
    const newScanner = new Upi({
      scannerImg: {
        public_id: scannerImg.public_id,
        url: scannerImg.url,
      },
    });

    await newScanner.save();

    return new Response(JSON.stringify(newScanner), {
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
    return new Response("Failed to create a new Scanner", { status: 500 });
  }
};
