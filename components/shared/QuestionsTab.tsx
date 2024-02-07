import { GetUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "./card/QuestionCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}
const QuestionsTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await GetUserQuestions({
    userId,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  });
  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          clerkId={clerkId}
          tags={question.tags}
          author={question.author}
          upVotes={question.upVotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
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

export default QuestionsTab;
