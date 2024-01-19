import mongoose, { Document, Schema, Types, model, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  createdOn: Date;
  questions: Types.ObjectId[];
  followers: Types.ObjectId[];
}

const TagSchema = new Schema<ITag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
