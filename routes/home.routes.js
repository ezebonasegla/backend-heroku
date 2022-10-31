import { Router } from 'express';

import { checkAuth } from '../middlewares/auth.js';

import path from 'path';

export const homeRouter = new Router();

homeRouter.get("/home", checkAuth, (req, res) => {
  res.render(path.join(process.cwd(), '/views/home.ejs'), {
    username: req.user.username,
  })
});