import express from "express";
import getFixed from "../controllers/fixed/getFixed.js";

const router = express.Router();

router.get("/", getFixed);

export default router;
