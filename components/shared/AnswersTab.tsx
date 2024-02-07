import { GetUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "./card/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}
const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await GetUserAnswers({
    userId,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          question={answer.question}
          clerkId={clerkId}
          upVotes={answer.upVotes}
          author={answer.author}
          createdAt={answer.createdAt}
        />
      ))}{" "}
      <div className="mt-10 ">
        <Pagination
          page={searchParams.page ? parseInt(searchParams.page) : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default AnswersTab;
