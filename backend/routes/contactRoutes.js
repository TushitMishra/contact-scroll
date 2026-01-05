import express from "express";
import { getContacts, createContact, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.delete("/:id", deleteContact); // ✅ NEW

export default router;
