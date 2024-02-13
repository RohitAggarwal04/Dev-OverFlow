"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-ful flex-col pt-16 gap-6  ">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose key={item.route} asChild>
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
              <p className={` ${isActive ? "base-bold" : "base-medium"} `}>
                {item.label}{" "}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="hamburger"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />{" "}
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none  "
      >
        <Link href="/" className="flex items-center gap-1 ">
          <Image
            src="/assets/images/site-logo.svg"
            alt="Dev OverFlow"
            width={23}
            height={23}
          />
          <p className="h2-bold font-spaceGrotesk text-dark100_light900 ">
            Dev <span className="text-primary-500">Overflow</span>{" "}
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="gap-3 flex flex-col ">
              <SheetClose asChild>
                <Link href="/sign-in">
                  {" "}
                  <Button className="w-full small-medium btn-secondary min-h-[41px] rounded-lg px-4 py-3 shadow-none ">
                    {" "}
                    <span className="primary-text-gradient ">Log In</span>{" "}
                  </Button>{" "}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  {" "}
                  <Button className="w-full small-medium text-dark400_light900 light-border-2 btn-tertiary min-h-[41px] rounded-lg px-4 py-3 shadow-none ">
                    {" "}
                    Sign Up
                  </Button>{" "}
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
