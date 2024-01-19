"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import connectToDB from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import Question from "../models/question.model";

export async function getUserById(params: any) {
  try {
    connectToDB();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDB();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(userData: UpdateUserParams) {
  try {
    connectToDB();
    const { clerkId, updateData, path } = userData;
    await User.findByIdAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUser(userData: DeleteUserParams) {
  try {
    connectToDB();
    const { clerkId } = userData;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }

    await Question.deleteMany({ author: user._id });
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}
