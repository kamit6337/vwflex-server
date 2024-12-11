import express from "express";
import getSingleMovie from "../controllers/movies/getSingleMovie.js";
import getMovieAdditional from "../controllers/movies/getMovieAdditional.js";
import getNowPlayingMovies from "../controllers/movies/getNowPlayingMovies.js";
import getPopularMovies from "../controllers/movies/getPopularMovies.js";

const router = express.Router();

router.get("/", getSingleMovie);
router.get("/additional", getMovieAdditional);
router.get("/now_playing", getNowPlayingMovies);
router.get("/popular", getPopularMovies);

export default router;
