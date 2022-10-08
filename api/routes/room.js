import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utilities/verifyToken.js";
const router = express.Router();

// Create
router.post("/:hotelid", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, updateRoom);

// room availability
router.put("/availability/:id", updateRoomAvailability);

// Delete
router.delete("/:id", verifyAdmin, deleteRoom);

// Get single room
router.get("/:id", getRoom);

// Get all rooms
router.get("/", getAllRooms);
export default router;
