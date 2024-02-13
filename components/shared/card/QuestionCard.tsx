import Link from "next/link";
import React from "react";
import RenderTags from "../RenderTags";
import Metric from "../Metric";
import { formatBigNumber, getTimeAgo } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";
interface Props {
  _id: number;
  title: string;
  tags: { _id: string; name: string }[];
  author: {
    clerkId: string;
    _id: number;
    name: string;
    picture: string;
  };
  upVotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upVotes,
  views,
  answers,
  clerkId,
  createdAt,
}: Props) => {
  const showActionsButton = clerkId && clerkId === author.clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
      <div className="flex items-start flex-col-reverse justify-between gap-5 sm:flex-row ">
        <div>
          {" "}
          <span className="subtle-regular text-dark400_light700 line-clamp-1 sm:hidden flex ">
            {getTimeAgo(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className="line-clamp-1 sm:h3-semibold base-semibold text-dark200_light900 flex-1">
              {title}
            </h3>{" "}
          </Link>
        </div>
        <SignedIn>
          {showActionsButton && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2  ">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Metric
          imgUrl={author.picture || "/assets/icons/avatar.svg"}
          alt="user"
          value={author.name}
          title={` - asked ${getTimeAgo(createdAt)}`}
          isAuthor
          href={`/profile/${author._id}`}
          textStyles="body-medium text-dark400_light700 "
        />{" "}
        <div className=" flex items-center max-sm:justify-start max-sm:flex-wrap gap-3">
          {" "}
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="upvotes"
            value={formatBigNumber(upVotes?.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800 "
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="answers"
            value={formatBigNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800 "
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={formatBigNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800 "
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
