import { GraphQLUpload } from "apollo-server";
import client from "../../client";
import { hashPassword, protectResolver } from "../user.utils";
import { createWriteStream } from "fs";
export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL,
          githubUsername,
        },
        { loggedInUser }
      ) => {
        let newAvatarUrl = null;
        if (avatarURL) {
          const { filename, createReadStream } = await avatarURL;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          newAvatarUrl = `https://milkymilkycode.com/proxy/${process.env.PORT}/static/${newFilename}`;
        }
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await hashPassword(newPassword);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            name,
            location,
            avatarURL: newAvatarUrl,
            githubUsername,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });
        if (!updatedUser.id) {
          return {
            ok: false,
            error: "Could not update Profile. Try again.",
          };
        } else {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
