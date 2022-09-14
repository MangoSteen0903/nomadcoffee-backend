import client from "../../client";
export default {
  Query: {
    seeUser: (_, { id }) => {
      return client.user.findUnique({ where: { id } });
    },
  },
};
