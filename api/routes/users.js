import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/users.js";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../utilities/verifyToken.js";
const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("User successfully log in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("User successfully logged in, you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Admin successfully logged in, you can delete all account");
// });

// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", verifyUser, deleteUser);

// Get single hotel
router.get("/:id", verifyUser, getUser);

// Get all hotels
// router.get("/", verifyAdmin, getAllUsers);
router.get("/", getAllUsers);

export default router;
