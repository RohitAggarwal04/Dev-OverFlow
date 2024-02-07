import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTags";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatBigNumber, getTimeAgo } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUserById } from "@/lib/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const page = async ({ params, searchParams }: any) => {
  if (!params.id) return null;
  const result = await getQuestionById({
    questionId: params.id,
  });
  const { userId: clerkId } = auth();
  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col ">
        <div className="fle flex-col-reverse sm:flex-row sm:items-senter sm:gap-2 w-full justify-between gap-5 ">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex gap-1 items-center justify-start "
          >
            <Image
              src={result.author.picture}
              width={22}
              height={22}
              className="rounded-full"
              alt="profile picture"
            />
            <p className="text-dark300_light700 paragraph-semibold ">
              {" "}
              {result.author.name}{" "}
            </p>
          </Link>
          <div className="flex justify-end ">
            <Votes
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upVotes={result.upVotes.length}
              downVotes={result.downVotes.length}
              hasupVoted={result.upVotes.includes(mongoUser._id)}
              hasdownVoted={result.downVotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className=" text-dark200_light900 mt-3.5 w-full text-left h2-semibold ">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4 ">
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value=" "
          title={`  asked ${getTimeAgo(result.createdAt)}`}
          textStyles="small-medium text-dark400_light800 "
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="answers"
          value={formatBigNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800 "
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="views"
          value={formatBigNumber(result.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800 "
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 gap-2 flex flex-wrap ">
        {result.tags.map((tag: any) => (
          <RenderTag _id={tag._id} key={tag._id} name={tag.name} />
        ))}
      </div>
      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
        filter={searchParams?.filter}
        page={searchParams?.page}
      />
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />{" "}
    </>
  );
};

export default page;
