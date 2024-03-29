import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeAgo } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}
const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({
    questionId,
    page: page ? page : 1,
    sortBy: filter,
  });
  return (
    <div className="mt-11 ">
      <div className="flex items-center justify-between ">
        <h3 className="primary-text-gradient">
          {totalAnswers ? `${totalAnswers} Answers` : "No Answers Yet!"}{" "}
        </h3>
        {totalAnswers !== 0 && <Filter filters={AnswerFilters} />}
      </div>
      <div>
        {" "}
        {result.answers.map((answer) => (
          <article key={answer._id} className="py-10 light-border border-b ">
            <div className="flex items-center justify-between ">
              <div className="mb-8 flex flex-col-reverse w-full justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
                <Link
                  href={`/profile${answer.author.clerkId}`}
                  className="sm:items-center flex flex-1 items-start gap-1 "
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="profile"
                    className="object-cover rounded-full max-sm:mt-0.5 "
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center ">
                    <p className="body-semibold  text-dark300_light700 ">
                      {answer.author.name}
                    </p>
                    <p className="line-clamp-1 ml-0.5 small-regular mt-0.5 text-light400_light500 ">
                      answered {getTimeAgo(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end  ">
                  <Votes
                    type="Answer"
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upVotes={answer.upVotes.length}
                    downVotes={answer.downVotes.length}
                    hasupVoted={answer.upVotes.includes(userId)}
                    hasdownVoted={answer.downVotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />{" "}
          </article>
        ))}
      </div>
      <div className="mt-10 w-full ">
        <Pagination page={page ? page : 1} isNext={result.isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
