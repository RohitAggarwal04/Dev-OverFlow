import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  if (!params.id) return null;
  const result = await getQuestionById({ questionId: params.id });
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="text-dark100_light900 h1-bold ">Edit question</h1>
      <div className="mt-9 ">
        <Question
          type="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetail={JSON.stringify(result)}
        />{" "}
      </div>
    </div>
  );
};

export default page;
