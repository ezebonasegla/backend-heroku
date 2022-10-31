import { Router } from "express";

import path from "path";

import passport from "passport";

import { checkNotAuth } from "../middlewares/auth.js";

export const authWebRouter = new Router();

authWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})


authWebRouter.get("/login", checkNotAuth, (req, res) => {
    res.render("login");
})

authWebRouter.get("/register", checkNotAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/register.ejs'))
})

authWebRouter.get('/logout', (req, res) => {
    let username = req.user.username
    req.logout();
    res.render('logout', {username})
})

authWebRouter.get('/failLogin', (req, res) => {
    res.render(path.join(process.cwd(), '/views/failLogin.ejs'))
})

authWebRouter.get('/failRegister', (req, res) => {
    res.render(path.join(process.cwd(), '/views/failRegister.ejs'))
})

authWebRouter.get("/auth/twitter", passport.authenticate("twitter"));

authWebRouter.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
        successRedirect: "/home",
        failureRedirect: "/failLogin",
    })
);

authWebRouter.post(
    "/login",
    passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/failLogin"
    })
);

authWebRouter.post(
    "/register",
    passport.authenticate("register", {
        successRedirect: "/login",
        failureRedirect: "/failRegister",
    })
);