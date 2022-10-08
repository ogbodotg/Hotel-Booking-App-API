import jwt from "jsonwebtoken";
import { createError } from "../errors/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "User not authenticated"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return next(createError(403, "Invalid token"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(
        createError(403, "You're not authorized to access resources")
      );
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return next(
        createError(403, "You're not authorized to access resources")
      );
    }
  });
};
