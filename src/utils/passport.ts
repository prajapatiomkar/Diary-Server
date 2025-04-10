import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { ENV } from "../constants/environment";
import passport from "passport";
import { User } from "../models/user.model";

const mockDB = [{ id: "123", email: "text@example.com" }];

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("jwt_payload", jwt_payload);
    const user = await User.findOne({ _id: jwt_payload._id });
    console.log("234", user);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

export { passport };
