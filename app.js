import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { isValidPassword } from "./utils/bcrypt.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } from "./config.js";

import { router as apiFakeProductsRoutes } from "./routes/fakeProducts.routes.js";
import { homeRouter as homeRouter } from "./routes/home.routes.js";
import { authWebRouter as authWebRoutes } from "./routes/auth.routes.js";
import { infoWebRouter as infoWebRoutes } from "./routes/info.js";

import { socketModule } from "./utils/socket.js";


import { User } from "./models/users.js";
import redis from "redis";
import connectRedis from 'connect-redis';

import http from "http";
import { Server as ioServer } from "socket.io";
import { createHash } from "./utils/bcrypt.js";

const app = express();
app.enable('trust proxy');
export const serverHttp = http.createServer(app);
const io = new ioServer(serverHttp);

//dirname
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//middlewears--------------------------------------------------------middlewears
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Motor EJS--------------------------------------------------------Motor EJS
app.set("views", "./views");
app.set("view engine", "ejs");



//Passport
passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:8080/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, done) {
      User.findOrCreate(
        { twitterId: profile.id, username: profile.username },
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
    User.findOne({ username }, (err, user) => {
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


//Redis
const client = redis.createClient({
  socket: {
    host: 'redis-15521.c244.us-east-1-2.ec2.cloud.redislabs.com',
    port: 15521
  },
  password: 'mff5UMebegakGuJq1sczwIAImvnErlIu',
  legacyMode: true,
});
client.connect();
const RedisStore = connectRedis(session);

//Session
app.use(
  session({
    store: new RedisStore({
      host: "redis-15521.c244.us-east-1-2.ec2.cloud.redislabs.com",
      port: 15521,
      client,
      ttl: 300
    }),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 86400000,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/productos-test", apiFakeProductsRoutes);
app.use(homeRouter);
app.use(authWebRoutes);
app.use(infoWebRoutes);

//Ruta 404
app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});

//Socket
socketModule(io);