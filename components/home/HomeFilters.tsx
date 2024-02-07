"use client";
import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState("");
  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        value: null,
        key: "filter",
        params: searchParams.toString(),
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        value: item.toLowerCase(),
        key: "filter",
        params: searchParams.toString(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="md:flex hidden mt-10 flex-wrap gap-3 ">
      {HomePageFilters.map((filter) => (
        <Button
          onClickCapture={() => handleTypeClick(filter.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:hover:bg-dark-400  "
              : " bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-300 "
          } `}
          key={filter.value}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
