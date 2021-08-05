import express from "express";

import { saveMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/save", saveMessage);
router.get("/getall", getMessage);

export default router;
