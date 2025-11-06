import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
