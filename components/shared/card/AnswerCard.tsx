import Link from "next/link";
import React from "react";
import Metric from "../Metric";
import { formatBigNumber, getTimeAgo } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";
interface Props {
  _id: number;
  author: {
    clerkId: string;
    _id: number;
    name: string;
    picture: string;
  };
  upVotes: string[];
  createdAt: Date;
  clerkId?: string;
  question: {
    title: string;
    _id: number;
  };
}

const AnswerCard = ({
  _id,
  question,
  author,
  upVotes,
  clerkId,
  createdAt,
}: Props) => {
  const showActionsButton = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] py-9 my-1 px-11 ">
      <div className="flex items-start flex-col-reverse justify-between gap-5 sm:flex-row ">
        <div>
          {" "}
          <span className="subtle-regular text-dark400_light700 line-clamp-1 sm:hidden flex ">
            {getTimeAgo(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className="line-clamp-1 sm:h3-semibold base-semibold text-dark200_light900 flex-1">
              {question.title}
            </h3>{" "}
          </Link>
        </div>
        <SignedIn>
          {showActionsButton && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author.name}
          title={` - asked ${getTimeAgo(createdAt)}`}
          isAuthor
          href={`/profile/${author._id}`}
          textStyles="body-medium text-dark400_light700 "
        />{" "}
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="upvotes"
          value={formatBigNumber(upVotes?.length)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800 "
        />
      </div>
    </div>
  );
};

export default AnswerCard;
