import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userRepository } from "../database/mongo/user/userModelRepo";
import { AuthProvider } from "../entities/user/AuthProvider";
import { AppError } from "../Error/appError";

// registered google strategy in passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        // extract email from profile
        const email = profile.emails?.[0].value;

        if (!email) {
          return cb(new AppError("No email found in google profile", 500));
        }

        // check user already exist with providers
        let user = await userRepository.findByProvider("google");

        if (!user) {
          // get user with emial
          user = await userRepository.findUserByEmail(email);

          // if user exist with google email, add provider and update it
          if (user) {
            user.addProvider(AuthProvider.google(profile.id));
            await userRepository.updateUser(user);
          } else {
            // if not, create a new user
            user = await userRepository.createUser({
              email,
              username: profile.displayName,
              avatar: profile.photos?.[0]?.value, // FIXED
              emailVerified: true,
              providers: [AuthProvider.google(profile.id)],
            });
          }
        }

        // send user to google callback
        return cb(null, user);
      } catch (error) {
        return cb(error as Error);
      }
    },
  ),
);

export default passport;
