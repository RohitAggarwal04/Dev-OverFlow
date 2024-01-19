import { TOP_QUESTIONS } from "@/constants/index";
import { POPOULAR_TAGS } from "@/constants/filters";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "../RenderTags";

const RightSidebar = () => {
  return (
    <section className="max-xl:hidden overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none background-light900_dark200 custom-scrollbar light-border sticky right-0 top-0 flex h-screen flex-col justify-between lg:w-[330px]  ">
      <div className="flex flex-col">
        <h3 className=" h3-bold text-dark200_light900 ">Top Questions</h3>
        <div className="flex flex-col w-full mt-7 justify-start gap-[30px] ">
          {TOP_QUESTIONS.map((item) => {
            return (
              <Link
                className="flex  cursor-pointer gap-7 justify-between items-center "
                href={`/questions/${item._id}`}
                key={item._id}
              >
                <p className="body-medium text-dark500_light700 ">
                  {item.title}
                </p>
                <Image
                  src="assets/icons/chevron-right.svg"
                  alt="chevron right"
                  width={20}
                  height={20}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col mt-16">
        <h3 className=" h3-bold text-dark200_light900 ">Popular Tags</h3>
        <div className="flex flex-col mt-7  gap-4 ">
          {POPOULAR_TAGS.map((tag) => {
            return (
              <RenderTags
                key={tag._id}
                _id={tag._id}
                name={tag.name}
                totalQuestions={tag.totalQuestions}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
