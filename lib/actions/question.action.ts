"use server";

import { revalidatePath } from "next/cache";
import Question from "../models/question.model";
import Tag from "../models/tag.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDB();

    const { title, content, tags, author, path } = params;
    const question = await Question.create({ title, content, author });
    const tagDocuments = [];

    //create the tags or get them if they already exists

    for (const tag of tags) {
      const existingTags = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, "i") },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTags._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path);
  } catch (error) {}
}
export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDB();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
