import redisClient from "../redisClient.js";

export const getMovieDetailFromRedis = async (id) => {
  const get = await redisClient.get(`Movie_Detail:${id}`);
  return get ? JSON.parse(get) : null;
};

export const setMovieDetailToRedis = async (movie) => {
  if (!movie) return;

  await redisClient.set(
    `Movie_Detail:${movie.id}`,
    JSON.stringify(movie),
    "EX",
    3600
  );
};
