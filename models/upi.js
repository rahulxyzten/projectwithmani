import { Schema, model, models } from "mongoose";

const UpiSchema = new Schema({
  scannerImg: {
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

const Upi = models.Upi || model("Upi", UpiSchema);

export default Upi;
