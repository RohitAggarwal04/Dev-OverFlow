import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}
const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-10 ">
      <Image
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="object-contain dark:hidden block "
      />
      <Image
        src="/assets/images/dark-illustration.png"
        alt="No result illustration"
        width={270}
        height={200}
        className="object-contain dark:block hidden "
      />
      <h2 className="h2-bold text-dark200_light900 mt-8 ">{title}</h2>
      <p className="my-3.5 max-w-md body-regular text-dark500_light700 text-center ">
        {description}
      </p>
      <Link href={link}>
        <Button className=" paragraph-medium mt-5  min-h-[46px] px-4 py-3 text-light-900  bg-primary-500 dark:text-light-900 ">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
