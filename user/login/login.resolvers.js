import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import client from "../../client";
import { hashPassword } from "../user.utils";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "Can't find User. Try again.",
        };
      }

      const validPassword = await compare(password, user.password);
      console.log(validPassword);
      if (validPassword) {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } else {
        return {
          ok: false,
          error: "Password is not matching. Try again.",
        };
      }
    },
  },
};
