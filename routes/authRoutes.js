import express from "express";
import {
  registerController,
  loginController,
  currentUserController,
  forgotPasswordController,
} from "../controllers/authCtrl.js";
import { requireSignin } from "../middlewares/index.js";
//router object
const router = express.Router();

//routes
//register route
router.post("/register", registerController);
//login route
router.post("/login", loginController);

router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
  });
//currentUser
router.get("/currentuser", requireSignin, currentUserController);
//forgot password
router.post("/forgot-password", forgotPasswordController);
export default router;