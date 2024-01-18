import express from "express";
import controller from "../controllers";

const router = express.Router();

router.get("/alarms", controller.getAlarms);
router.post("/alarms", controller.createAlarm);
router.put("/alarms/:id", controller.updateAlarm);
router.delete("/alarms/:id", controller.deleteAlarm);

export default router;
