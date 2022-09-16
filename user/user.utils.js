import jwt from "jsonwebtoken";
import client from "../client";
import { hash } from "bcrypt";
export const getUser = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const protectResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "Please log in to perform this action.",
    };
  }
  return ourResolver(root, args, context, info);
};

export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};
