import { hash } from "bcrypt";
import client from "../../client";
export default {
  Mutation: {
    createUser: async (
      _,
      { username, email, name, location, password, avatarURL, githubUsername }
    ) => {
      const existsUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      if (existsUser) {
        console.log(existsUser);
        return {
          ok: false,
          error: "This Username / Email is already taken.",
        };
      }
      const hashedPassword = await hash(password, 10);
      await client.user.create({
        data: {
          username,
          email,
          name,
          location,
          password: hashedPassword,
          avatarURL,
          githubUsername,
        },
      });
      return {
        ok: true,
      };
    },
  },
};
