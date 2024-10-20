import { mergeResolvers } from "@graphql-tools/merge";
import movieResolvers from "./resolvers/movie.js";

const resolversArray = [movieResolvers];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
