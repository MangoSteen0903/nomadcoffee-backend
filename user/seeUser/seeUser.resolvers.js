import client from "../../client";
export default {
  Query: {
    seeUser: async (_, { username }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "Can't find user. Try again.",
        };
      } else {
        return {
          ok: true,
          user,
        };
      }
    },
  },
};
