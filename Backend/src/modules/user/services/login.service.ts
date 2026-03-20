import bcrypt from "bcryptjs";
import { userRepository } from "../../../database/mongo/user/userModelRepo";
import { AppError } from "../../../Error/appError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt.utils";
import redisClient from "../../../config/redis.connection";

export const loginService = async (email: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // GENERATE TOKENS
  const accessToken = generateAccessToken({
    userId: user.id.toString(),
    email: user.getEmail(),
  });
  const refreshToken = generateRefreshToken({
    userId: user.id.toString(),
    email: user.getEmail(),
  });

  // SAVE REFRESH TOKEN TO REDIS (EXPIRES IN 7 DAYS)
  await redisClient.set(`refresh:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60,
  });

  return { user, accessToken, refreshToken };
};
