import catchAsyncError from "../../lib/catchAsyncError.js";
import HandleGlobalError from "../../lib/HandleGlobalError.js";
import { getReq } from "../../utils/api/api.js";

const getMovieAdditional = catchAsyncError(async (req, res, next) => {
  const {
    id,
    reviews = false,
    images = false,
    similar = false,
    page = 1,
  } = req.query;

  if (!id) {
    return next(new HandleGlobalError("Movie Id not provided", 404));
  }

  if (images) {
    const fetchMovieImages = await getReq(`/movie/${id}/images`);

    const modifyMovieImages = fetchMovieImages?.backdrops?.map((obj) => {
      const { aspect_ratio: ratio, file_path: path } = obj;

      return { ratio, path };
    });

    res.json(modifyMovieImages);
    return;
  }

  if (reviews) {
    let movieReviews = await getReq(`/movie/${id}/reviews`, {
      params: { page },
    });

    movieReviews = {
      totalPages: movieReviews.total_pages,
      page: movieReviews.page,
      data: movieReviews.results,
    };

    res.json(movieReviews);
    return;
  }

  if (similar) {
    let similarMovie = await getReq(`/movie/${id}/similar`, {
      params: { page },
    });
    similarMovie = {
      page: similarMovie.page,
      data: similarMovie.results,
    };

    res.json(similarMovie);
  }
});

export default getMovieAdditional;
