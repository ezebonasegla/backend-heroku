import { Router } from "express";

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
    res.render('register')
})

authWebRouter.get('/logout', (req, res) => {
    let username = req.user.username
    req.logout();
    res.render('logout', {username})
})

authWebRouter.get('/failLogin', (req, res) => {
    res.render('failLogin')
})

authWebRouter.get('/failRegister', (req, res) => {
    res.render('failRegister')
})

authWebRouter.get("/auth/twitter", passport.authenticate("twitter"));

authWebRouter.get(
    "/auth/twitter/callback",
    passport.authenticate("twitter", {
        successRedirect: "/home",
        failureRedirect: "/failLogin",
    })
)

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