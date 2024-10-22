import { Schema, model } from "mongoose";

const watchlistTvSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WatchlistTv = model("WatchlistTv", watchlistTvSchema);

export default WatchlistTv;
