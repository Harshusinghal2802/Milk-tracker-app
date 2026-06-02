import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addMilkEntry,
  getMilkEntries,
  updateMilkEntry,
  deleteMilkEntry,
  getMonthlyReport,
} from "../controllers/milkController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  addMilkEntry
);

router.get(
  "/",
  protect,
  getMilkEntries
);

router.get(
  "/monthly-report",
  protect,
  getMonthlyReport
);

router.put(
  "/:id",
  protect,
  updateMilkEntry
);

router.delete(
  "/:id",
  protect,
  deleteMilkEntry
);

export default router;