import { connectToDB } from "@/utils/database";
import Offer from "@/models/offer";
import cloudinary from "@/utils/cloudinary";

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  const { searchParams } = new URL(request.url);
  try {
    await connectToDB();

    const recentOffer = await Offer.findById(params.id);

    // Deleting image from cloudinary
    const imgId = recentOffer.cover.public_id;
    await cloudinary.uploader.destroy(imgId);

    // Deleting project data from databse
    await Offer.deleteOne({ _id: params.id });

    return new Response("Recent offer deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting recent offer", { status: 500 });
  }
};
