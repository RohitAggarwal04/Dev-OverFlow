"use client";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  isNext: boolean;
}
const Pagination = ({ page, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNavigation = (direction: string) => {
    const nextPageNumber = direction === "prev" ? page - 1 : page + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      value: nextPageNumber.toString(),
      key: "page",
    });
    router.push(newUrl);
  };
  if (!isNext && page === 1) {
    return null;
  }
  return (
    <div className="flex w-full items-center justify-center gap-2 ">
      <Button
        disabled={page === 1}
        onClick={() => handleNavigation("prev")}
        className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2 "
      >
        <p className="body-medium text-dark200_light800 ">Prev</p>
      </Button>
      <div className="bg-primary-500 flex justify-center items-center rounded-md px-3.5 py-2  ">
        <p className="body-semibold text-light-900  ">{page}</p>
      </div>{" "}
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2 border btn flex min-h-[36px] items-center justify-center gap-2 "
      >
        <p className="body-medium text-dark200_light800 ">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
