"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  title: string;
  description: string;
  employment: string;
  apply_link: string;
  flagUrl: string;
  location: { state: string; country: string };
}
const JobCard = ({
  imgUrl,
  title,
  description,
  employment,
  apply_link,
  location,
  flagUrl,
}: Props) => {
  const getLocation = (location: any) => {
    const state = location.state || "";
    const country = location.country || "";

    const geo = [state, country].filter(Boolean).join(", ");

    return geo;
  };

  return (
    <div className="card-wrapper rounded-[10px] py-4 px-2 sm:px-11 ">
      <div className="flex max-sm:flex-col gap-8 ">
        <Image
          src={imgUrl || "/assets/images/site-logo.svg"}
          alt=""
          width={64}
          height={64}
          className="object-contain rounded-lg "
        />
        <div className="flex flex-1  flex-col gap-5  ">
          <div className="flex max-md:flex-col  justify-between ">
            <h1 className="base-semibold text-dark200_light900 flex ">
              {title}
            </h1>
            <div className="rounded-full flex text-dark400_light700 gap-2 w-fit h-fit whitespace-nowrap items-center justify-center bg-[#212734] py-1 px-4  ">
              <Image
                src={flagUrl}
                alt="flag"
                width={16}
                height={16}
                className="object-contain "
              />{" "}
              {getLocation(location)}
            </div>
          </div>
          <p className="text-dark500_light700 paragraph-regular flex-1 break-all line-clamp-2 ">
            {description}
          </p>
          <div className="flex justify-between max-md:flex-col gap-4 ">
            <div className="flex gap-4">
              <p className="capitalise text-light-500 body-medium gap-2  items-center flex  ">
                <Image
                  src="/assets/icons/clock-2.svg"
                  alt="clock"
                  width={16}
                  height={16}
                />{" "}
                {employment}
              </p>

              <p className=" text-light-500 body-medium gap-2 text-ellipsis items-center flex ">
                {" "}
                <Image
                  src="/assets/icons/currency-dollar-circle.svg"
                  alt="clock"
                  width={16}
                  height={16}
                />
                Not disclosed
              </p>
            </div>
            <Link
              href={apply_link}
              target="_blank"
              rel="noreferrer"
              className="primary-text-gradient flex gap-2 body-semibold "
            >
              View job
              <Image
                src="/assets/icons/arrow-up-right.svg"
                alt="arrow"
                width={20}
                height={20}
              />{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
