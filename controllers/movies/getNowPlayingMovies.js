import catchAsyncError from "../../lib/catchAsyncError.js";
import { getReq } from "../../utils/api/api.js";

const getNowPlayingMovies = catchAsyncError(async (req, res, next) => {
  const { page = 1 } = req.query;

  const nowPlayingMovies = await getReq("/movie/now_playing", {
    params: { page },
  });

  const response = nowPlayingMovies.results;

  res.json(response);
});

export default getNowPlayingMovies;
