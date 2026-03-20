import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { userRepository } from "../../../database/mongo/user/userModelRepo";
import { AppError } from "../../../Error/appError";
import { CreateUserData } from "../../../entities/user/userRepo";
import { AuthProvider } from "../../../entities/user/AuthProvider";
import { verificationEmailTemplate } from "../../../utils/verificationCode.structure";

const resend = new Resend(process.env.RESEND_API_KEY);

export const registerService = async (email: string, username: string) => {
  // check existing user
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    // if exist then check provider and link it
    // check email provider
    const hasEmailProvider = await userRepository.findByProvider("credentials");

    // check google provider
    const hasGoogleProvider = await userRepository.findByProvider("google");

    // if user already with same email
    if (hasEmailProvider) {
      throw new AppError("User already exist", 400);
    }

    // if user exist with google account, just link this email credentials with account
    if (!hasEmailProvider && hasGoogleProvider) {
      // link user with credentials
      hasGoogleProvider.addProvider(AuthProvider.credentials());

      // update the user
      await userRepository.updateUser(hasGoogleProvider);
    }
  } else {
    // create new user from scratch with credentials data

    // create random 6 digit number
    const verifyCode: number = Math.floor(100000 + Math.random() * 900000);

    // apply the verification expiry (15 minutes)
    const verifyExpiry: Date = new Date(Date.now() + 15 * 60 * 1000);

    // add credentials as auth providers
    const authProvider = AuthProvider.credentials();

    // prepare create new user data
    const userData: CreateUserData = {
      email,
      username,
      verificationCode: verifyCode,
      verificationExpiry: verifyExpiry,
      providers: [authProvider],
    };

    const user = await userRepository.createUser(userData);

    if (!user) {
      throw new AppError("Error in user creation. Please try again!", 500);
    }

    // send email to user email with verification Code
    try {
      await resend.emails.send({
        from: "Walefare-Scheme Platform <onboarding@resend.dev>",
        to: email,
        subject: "Verify your account",
        html: verificationEmailTemplate(username, verifyCode),
      });
    } catch (error) {
      console.error("Failed to send verification email:", error);
      // We don't necessarily want to fail the whole registration if email fails,
      // but in a strict system we might. For now, we'll just log it.
    }
  }
};
