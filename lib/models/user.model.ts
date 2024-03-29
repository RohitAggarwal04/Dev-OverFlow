import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  picture: string;
  email: string;
  password?: string;
  bio?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation: number;
  joinedAt: Date;
  saved: Schema.Types.ObjectId[];
}
const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
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
