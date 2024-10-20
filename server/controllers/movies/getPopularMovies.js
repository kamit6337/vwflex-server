import catchAsyncError from "../../lib/catchAsyncError.js";
import { getReq } from "../../utils/api/api.js";

const getPopularMovies = catchAsyncError(async (req, res, next) => {
  const { page = 1 } = req.query;

  const popularMovies = await getReq("/movie/popular", {
    params: { page },
  });

  const response = {
    totalPages: popularMovies.total_pages,

    page: popularMovies.page,
    data: popularMovies.results,
    message: "Popular Movies list",
  };

  res.json(response);
});

export default getPopularMovies;
