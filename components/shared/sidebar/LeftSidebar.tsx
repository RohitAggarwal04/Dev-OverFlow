"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SignedOut } from "@clerk/nextjs";
const LeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none background-light900_dark200 custom-scrollbar max-sm:hidden light-border sticky left-0 top-0 flex h-screen flex-col justify-between lg:w-[266px] ">
      <div className="flex flex-1 flex-col gap-6 ">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;
          return (
            <Link
              href={item.route}
              className={` ${
                isActive
                  ? "primary-gradient text-light-900 rounded-lg "
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4  `}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={` ${!isActive && "invert-colors"} `}
              />
              <p
                className={` ${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden `}
              >
                {item.label}{" "}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="gap-3 flex flex-col ">
          <Link href="/sign-in">
            {" "}
            <Button className="w-full small-medium btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none ">
              {" "}
              <span className="primary-text-gradient max-lg:hidden ">
                {" "}
                Log In{" "}
              </span>{" "}
              <Image
                src="/assets/icons/account.svg"
                className="invert-colors lg:hidden  "
                alt="login"
                width={20}
                height={20}
              />
            </Button>{" "}
          </Link>

          <Link href="/sign-up">
            {" "}
            <Button className="w-full small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] rounded-lg px-4 py-3 shadow-none ">
              {" "}
              <span className=" max-lg:hidden "> Sign Up </span>{" "}
              <Image
                src="/assets/icons/sign-up.svg"
                className="invert-colors lg:hidden  "
                alt="sign-up"
                width={20}
                height={20}
              />
            </Button>{" "}
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
