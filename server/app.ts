import "dotenv/config";
import express, { json, Request, urlencoded } from "express";
import cors from "cors";
import session from "express-session";
import apiRouter from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import passport, { prismaStore } from "./configs/auth.js";

const app = express();
app.use(cors<Request>({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: prismaStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  }),
);
app.use(passport.session());

app.use("/api", apiRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(
  port,
  () =>
    process.env.NODE_ENV === "development" &&
    console.log("http://localhost:" + port),
);
