import catchAsyncError from "../../../lib/catchAsyncError.js";
import { getReq } from "../../../utils/api/api.js";

const popularMoviesList = catchAsyncError(async (page = 1) => {
  const popularMovies = await getReq("/movie/popular", {
    params: { page },
  });

  const response = {
    totalPages: popularMovies.total_pages,

    page: popularMovies.page,
    data: popularMovies.results,
    message: "Popular Movies list",
  };

  return response;
});

export default popularMoviesList;
