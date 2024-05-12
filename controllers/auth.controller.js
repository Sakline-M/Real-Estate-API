import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

/* NEW USER REGISTATION */
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //CREATE HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DATABASE
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Faild to craete user",
    });
  }
};

/* USER LOGIN */
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!username)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // CHECK THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });

    // GENERATE TOKEN AND SEND TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true  note:For prodduction mode
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log("Error while login");
    res.status(500).json({
      message: "Faild to login",
    });
  }
};

/* USER LOGOUT */
export const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
