import mongoose, { Schema, model, models } from "mongoose";

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, required: true, ref: "Question" },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    default: Date.now,
    type: Date,
  },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
