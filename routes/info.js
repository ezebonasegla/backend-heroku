import { Router } from "express";
import os from 'os';
const numCPUs = os.cpus().length;
export const infoWebRouter = new Router();

infoWebRouter.get("/info", (req, res) => {
    res.render("info", {
        numCPUs: numCPUs
    })
});