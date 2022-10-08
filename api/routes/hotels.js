import express from "express";
import {
  countByCity,
  countByType,
  countType,
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  getRooms,
  updateHotel,
} from "../controllers/hotels.js";
import { createError } from "../errors/error.js";
import Hotels from "../models/Hotels.js";
import { verifyAdmin } from "../utilities/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/get/:id", verifyAdmin, updateHotel);

// Delete
router.delete("/get/:id", verifyAdmin, deleteHotel);

// Get single hotel
router.get("/get/:id", getHotel);

// Get all hotels
router.get("/", getAllHotels);

// Hotel counts
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/countType", countType);
router.get("/rooms/:id", getRooms);

export default router;
