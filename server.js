import "dotenv/config";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser } from "./user/user.utils";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const token = req.headers.token;
    const loggedInUser = await getUser(token);
    return {
      loggedInUser,
    };
  },
});

const PORT = process.env.PORT;
const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on https://milkymilkycode/proxy/${PORT}`);
});
