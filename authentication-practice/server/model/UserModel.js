import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: String,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
  token: String,
});

const User = model("User", userSchema);
  
export default User;
