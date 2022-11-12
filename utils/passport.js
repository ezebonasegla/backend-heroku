import { isValidPassword, createHash } from "./bcrypt.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } from "../config.js";
import { User } from "../models/users.js";

export const passportConfig = (passport) => {
    passport.use(
        new TwitterStrategy({
                consumerKey: TWITTER_CONSUMER_KEY,
                consumerSecret: TWITTER_CONSUMER_SECRET,
                callbackURL: "/auth/twitter/callback",
            },
            function (token, tokenSecret, profile, done) {
                User.findOrCreate({
                        twitterId: profile.id,
                        username: profile.username
                    },
                    (err, user) => {
                        if (err) return done(err);
                        return done(null, user);
                    }
                );
            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy((username, password, done) => {
            User.findOne({
                username
            }, (err, user) => {
                if (err) return done(err);

                if (!user) {
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    return done(null, false);
                }

                return done(null, user);
            });
        })
    );

    passport.use(
        "register",
        new LocalStrategy({
            passReqToCallback: true
        }, (req, username, password, done) => {
            User.findOne({
                username: username
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false, {
                        message: "Usuario ya registrado",
                    });
                }

                const newUser = new User({
                    username: username,
                    password: createHash(password),
                });

                User.create(newUser, (err, userWithId) => {
                    if (err) {
                        return done(err);
                    }
                    return done(null, userWithId);
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });
};