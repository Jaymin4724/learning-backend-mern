import User from "../model/user-model.js"; // Import Mongoose User model

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); // 200: OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by ID
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user); // 200: OK
    } else {
      res.status(404).json({ message: "User not found" }); // 404: Not Found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json(updatedUser); // 200: OK
    } else {
      res.status(404).json({ message: "User not found" }); // 404: Not Found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Replace a user by ID
const replaceUser = async (req, res) => {
  try {
    const id = req.params.id;
    const replacedUser = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    if (replacedUser) {
      res.status(200).json(replacedUser); // 200: OK
    } else {
      res.status(404).json({ message: "User not found" }); // 404: Not Found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted", deletedUser }); // 200: OK
    } else {
      res.status(404).json({ message: "User not found" }); // 404: Not Found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export { getAllUsers, getUser, updateUser, replaceUser, deleteUser };
