import { mergeResolvers } from "@graphql-tools/merge";
import movieResolvers from "./resolvers/movie.js";
import fixedResolvers from "./resolvers/fixed.js";
import authResolvers from "./resolvers/auth.js";

const resolversArray = [movieResolvers, fixedResolvers, authResolvers];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
