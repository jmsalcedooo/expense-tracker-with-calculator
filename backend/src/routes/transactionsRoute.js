import express from "express";
import { getTransactionsByUserId, getTransactionById } from "../controllers/transactionsController.js";
import {createTransaction} from "../controllers/transactionsController.js";

import {deleteTransaction} from "../controllers/transactionsController.js";
import {getSummaryByUserId} from "../controllers/transactionsController.js";
// In backend/src/routes/transactionsRoute.js
import { updateTransaction } from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/summary/:userId", getSummaryByUserId);
router.get("/transaction/:id", getTransactionById); // <-- Add this
router.get("/:userId", getTransactionsByUserId);
router.put("/:id", updateTransaction);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);

export default router;