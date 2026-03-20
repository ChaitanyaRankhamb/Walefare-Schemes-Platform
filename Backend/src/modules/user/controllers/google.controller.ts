import { Request, Response, NextFunction } from "express";
import { handleGoogleLoginService } from "../services/google.service";
import { User } from "../../../entities/user/user";
import { AppError } from "../../../Error/appError";

export interface googleResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const googleCallbackController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as User;

    if (!user) {
      throw new AppError("User not found from passport", 400);
    }

    const { accessToken, refreshToken } = await handleGoogleLoginService(user);

    const response: googleResponse = {
      status: 200,
      message: "User Login Successfully!",
      data: {
        accessToken,
        refreshToken,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
