import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../db/models/userModel';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/api/user/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = new User({
          googleId: profile.id,
          email: profile.emails ? profile.emails[0].value : '',
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          accessToken,
          refreshToken
        });
        await user.save();
      } else {
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj as typeof User);
});

export default passport;