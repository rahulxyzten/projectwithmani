import { Schema, model, models } from "mongoose";
import { type } from "os";

const OfferSchema = new Schema({
  offerDescription: {
    type: String,
    required: [true, "Offer description is required!"],
  },
  youtubelink: {
    type: String,
    default: null,
    required: false,
  },
  cover: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const Offer = models.Offer || model("Offer", OfferSchema);

export default Offer;
