import express from "express";
import {
  generateAccessToken,
  verifyAccessToken
} from "../middleware/authentication.middleware";
import { HttpHelper } from "@lib/helpers/http.helper";
import {
  getUserByUsernamePassword,
  assignUserLogin,
  validateNewUser,
  insertNewUser,
  logOut,
  updateUser,
  verifyUpdateUser,
  getUserById
} from "../middleware/user.middleware";

const router = express.Router();

// Log In
router.post(
  `/${HttpHelper.logIn}`,
  getUserByUsernamePassword,
  generateAccessToken,
  assignUserLogin
);

// Sign Up
router.post(`/`, validateNewUser, insertNewUser);

// Update
router.put(`/`, verifyAccessToken, verifyUpdateUser, updateUser);

// Get by Id
router.get(`/:id`, verifyAccessToken, getUserById);

// Log out
router.post(`/${HttpHelper.logOut}`, logOut);

module.exports = router;
