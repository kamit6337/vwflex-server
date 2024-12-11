import { Schema, model } from "mongoose";

const watchlistMovieSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const WatchlistMovie = model("WatchlistMovie", watchlistMovieSchema);

export default WatchlistMovie;
