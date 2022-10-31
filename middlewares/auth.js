export function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

export function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect("/home");
    } else {
        next();
    }
}