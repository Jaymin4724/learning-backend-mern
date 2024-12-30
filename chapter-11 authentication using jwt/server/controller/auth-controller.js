import jwt from "jsonwebtoken";
import User from "../model/user-model.js";
import { hashSync, compareSync } from "bcrypt";

// Signup
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    var token = jwt.sign({ email: req.body.email }, process.env.SECRET, {
      expiresIn: "1h",
    });
    const hash = hashSync(req.body.password, 10);
    newUser.token = token;
    newUser.password = hash;
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // 201: Created
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login
const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // 404: Not Found
    }

    // Verify password
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" }); // 401: Unauthorized
    }

    // Generate a new token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    user.token = token;
    await user.save();
    res.status(200).json({ message: "Login successful", token }); // 200: OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // 500: Internal Server Error
  }
};
export { createUser, getUser };
