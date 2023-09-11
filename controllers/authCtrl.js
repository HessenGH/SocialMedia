import userModel from "../models/userModel.js";
import { hashPassword, comaprePassword } from "../utils/helper.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user in db
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid User");
    //check password
    const match = await comaprePassword(password, user.password);
    if (!match) return res.status(400).send("Invalid Password");
    //jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user.password = undefined;
    user.answer = undefined;
    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error, Try Again");
  }
};
//protected route
export const currentUserController = async (req, res) => {
  console.log(req.user);
  try {
    const user = await userModel.findById(req.user._id);
    // console.log(req.user._id)
    res.json({ ok: true });
    // res.json(user)
  } catch (error) {
    console.log(error);
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  const { email, answer, newPassword } = req.body;
  //validation
  if (!email) {
    res.status(400).send("Email Is Requires");
  }
  if (!newPassword) {
    res.status(400).send("New Password Required");
  }
  if (!answer) {
    res.status(400).send("Answer is Required");
  }
  const user = await userModel.findOne({ email, answer });
  if (!user) {
    res.status(404).sed("Wrong Email Or Answer,PLease Try Again");
  }
  try {
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(201).send("Password Reset success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Somthing Went Wrong");
  }
};