import mongoose, { Schema, model, models } from "mongoose";
import { boolean, date } from "zod";
const UserSchema = new mongoose.Schema({
  clerkId: { type: Number, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  joinedAt: {
    default: Date.now,
    type: Date,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
