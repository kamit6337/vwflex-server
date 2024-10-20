import catchAsyncError from "../../lib/catchAsyncError.js";
import HandleGlobalError from "../../lib/HandleGlobalError.js";
import { getReq } from "../../utils/api/api.js";

const getSingleMovie = catchAsyncError(async (req, res, next) => {
  const { id, recommendations = true, page = 1 } = req.query;

  if (!id) {
    return next(new HandleGlobalError("Movie Id not provided", 404));
  }

  const response = {};

  const movie = await getReq(`/movie/${id}`);
  response.details = movie;

  if (recommendations) {
    const movieRecommendations = await getReq(`/movie/${id}/recommendations`, {
      params: { page },
    });

    response.recommendations = {
      page: movieRecommendations.page,
      data: movieRecommendations.results,
    };
  }

  res.json(response);
});

export default getSingleMovie;
