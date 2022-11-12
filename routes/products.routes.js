//Requires
import { Router } from "express";
import * as productFakeController from "../controllers/productFake.controller.js";
import * as productHandler from "../controllers/products.controller.js";

export const router = Router();

router.get("/api/productos-test", productFakeController.getData);
router.get("/api/productos", productHandler.getAllProducts);
