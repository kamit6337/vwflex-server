import { mergeResolvers } from "@graphql-tools/merge";
import movieResolvers from "./resolvers/movie.js";
import fixedResolvers from "./resolvers/fixed.js";
import authResolvers from "./resolvers/auth.js";
import peoplesResolver from "./resolvers/peoples.js";

const resolversArray = [
  movieResolvers,
  fixedResolvers,
  authResolvers,
  peoplesResolver,
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
