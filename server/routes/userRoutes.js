import express from "express";
import updateUserProfile from "../controllers/user/updateUserProfile.js";

const router = express.Router();

router.patch("/", updateUserProfile);

export default router;
