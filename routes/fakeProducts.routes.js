//Requires
import { Router } from "express";
import * as productFakeController from "../controllers/productFake.controller.js";
export const router = Router();

router.get("/", productFakeController.getData);
