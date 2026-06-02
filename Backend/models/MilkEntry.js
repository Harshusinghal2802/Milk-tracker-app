import mongoose from "mongoose";

const milkEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    liters: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerLiter: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    vendor: {
      type: String,
      default: "Regular Milkman",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const MilkEntry = mongoose.model(
  "MilkEntry",
  milkEntrySchema
);

export default MilkEntry;