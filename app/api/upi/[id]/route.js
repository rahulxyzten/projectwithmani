import { connectToDB } from "@/utils/database";
import Upi from "@/models/upi";
import cloudinary from "@/utils/cloudinary";

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  try {
    await connectToDB();

    const recentScanner = await Upi.findById(params.id);

    const imgId = recentScanner.scannerImg.public_id;
    await cloudinary.uploader.destroy(imgId);

    await Upi.deleteOne({ _id: params.id });

    return new Response("Recent Scanner deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting recent Scanner", { status: 500 });
  }
};
