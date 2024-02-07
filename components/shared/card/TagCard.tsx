import Link from "next/link";
import React from "react";

interface Props {
  tag: {
    _id: string;
    name: string;
    questions: Array<object>; // Update this to the actual type of questions
    description: string;
  };
}

const TagCard = ({ tag }: Props) => {
  return (
    <Link href={`/tags/${tag._id}`} className="shadow-light100_darknone ">
      <article className="background-light900_dark200 sm:w-[260px] light-border flex w-full flex-col  rounded-2xl border px-8 py-10 ">
        <div className="mt-4 background-light800_dark400  w-fit rounded-sm px-5 py-1.5  ">
          <h3 className="h3-bold text-dark300_light900 paragrph-semibold">
            {tag.name}
          </h3>
        </div>
        <p>{tag.description!}</p>
        <p className="small-medium text-dark400_light500 mt-3.5 ">
          <span className="mr-2.5 paragraph-semibold primary-text-gradient">
            {tag.questions.length}+
          </span>{" "}
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
