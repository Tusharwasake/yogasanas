  import mongoose from "mongoose";

  const asanaSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    benefits: { type: [String], required: true },
    imageUrl: {
      type: String,
      default: "https://default-asana-image.com/image.png",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  });

  const Asana = mongoose.model("Asana", asanaSchema);
  export default Asana;
