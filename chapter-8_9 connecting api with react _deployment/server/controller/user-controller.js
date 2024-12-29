import { readFileSync, writeFileSync } from "fs";
import path, { dirname } from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userDataPath = path.resolve(__dirname, "user.json");
const users = JSON.parse(readFileSync(userDataPath, "utf-8")).users;

const saveUsers = () => {
  writeFileSync(userDataPath, JSON.stringify({ users }, null, 2), "utf-8");
};

const createUser = (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  saveUsers();
  res.status(201).json(newUser); // 201: Created
};

const getAllUsers = (req, res) => {
  res.status(200).json(users); // 200: OK
};

const getUser = (req, res) => {
  const id = +req.params.id;
  const user = users.find((u) => u.id === id);
  if (user) {
    res.status(200).json(user); // 200: OK
  } else {
    res.status(404).json({ message: "User not found" }); // 404: Not Found
  }
};

const updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    saveUsers();
    res.status(200).json(updatedUser); // 200: OK
  } else {
    res.status(404).json({ message: "User not found" }); // 404: Not Found
  }
};

const replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    users[userIndex] = { id, ...req.body };
    saveUsers();
    res.status(200).json(users[userIndex]); // 200: OK
  } else {
    res.status(404).json({ message: "User not found" }); // 404: Not Found
  }
};

const deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    saveUsers();
    res.status(200).json({ message: "User deleted", user: deletedUser }); // 200: OK
  } else {
    res.status(404).json({ message: "User not found" }); // 404: Not Found
  }
};

export {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  replaceUser,
  deleteUser,
};
