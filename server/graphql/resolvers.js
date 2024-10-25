import { mergeResolvers } from "@graphql-tools/merge";
import movieResolvers from "./resolvers/movie.js";
import fixedResolvers from "./resolvers/fixed.js";
import authResolvers from "./resolvers/auth.js";
import peoplesResolver from "./resolvers/peoples.js";
import searchResolver from "./resolvers/search.js";
import tvShowResolver from "./resolvers/tvShow.js";
import watchlistResolver from "./resolvers/watchlist.js";

const resolversArray = [
  movieResolvers,
  fixedResolvers,
  authResolvers,
  peoplesResolver,
  searchResolver,
  tvShowResolver,
  watchlistResolver,
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
