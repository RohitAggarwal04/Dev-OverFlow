"use server";

import Interaction from "../models/interaction.model";
import Question from "../models/question.model";
import connectToDB from "../mongoose";
import { ViewQuestionParams } from "./shared.types";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDB();
    const { questionId, userId } = params;

    //function is called twice
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    // Check if Interaction already exists
    const existingInteraction = await Interaction.findOne({
      user: userId,
      action: "view",
      question: questionId,
    });

    if (existingInteraction) {
      return;
    }

    await Interaction.create({
      user: userId,
      action: "view",
      question: questionId,
    });
  } catch (error) {
    throw error;
  }
}
