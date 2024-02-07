"use server";

import Question from "../models/question.model";
import connectToDB from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "../models/user.model";
import Answer from "../models/answer.model";
import Tag from "../models/tag.model";

const SearchableTypes = ["question", "answer", "user", "tag"];
export async function globalSearch(params: SearchParams) {
  const { query, type } = params;
  try {
    connectToDB();
    const regexQuery = { $regex: query, $options: "i" };
    let result = [];

    const modelsandTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();
    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      for (const { model, searchField, type } of modelsandTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);
        result.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query} `
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsandTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid Search type");
      }
      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      result = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query} `
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }
    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
