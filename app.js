import express from "express";
import session from "express-session";

import http from "http";
import { Server as ioServer } from "socket.io";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { router as productsRoutes } from "./routes/products.routes.js";
import { homeRouter as homeRoutes } from "./routes/home.routes.js";
import { authWebRouter as authWebRoutes } from "./routes/auth.routes.js";
import { infoWebRouter as infoWebRoutes } from "./routes/info.js";

import { socketModule } from "./utils/socket.js";
import cors from "cors";

import passport from "passport";
import { passportConfig } from "./utils/passport.js";

import redis from "redis";
import connectRedis from 'connect-redis';

const app = express();
app.enable('trust proxy');
export const serverHttp = http.createServer(app);
const io = new ioServer(serverHttp);

//Dirname
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//Middlewears
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

//Motor EJS
app.set("views", "./views");
app.set("view engine", "ejs");

//Passport
passportConfig(passport)

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
app.use(productsRoutes);
app.use(homeRoutes);
app.use(authWebRoutes);
app.use(infoWebRoutes);

//Ruta 404
app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});

//Socket
socketModule(io);