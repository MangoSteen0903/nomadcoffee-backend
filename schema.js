import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const loadTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const typeDefs = mergeTypeDefs(loadTypeDefs);

const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
const resolvers = mergeResolvers(loadResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
