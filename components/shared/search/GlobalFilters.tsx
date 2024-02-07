"use client";
import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");
  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        value: null,
        key: "type",
        params: searchParams.toString(),
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        value: item.toLowerCase(),
        key: "type",
        params: searchParams.toString(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className=" flex items-center gap-5 px-5  ">
      <p className="text-dark400_light900 body-medium  ">Type:</p>
      <div className="flex gap-3 ">
        {GlobalSearchFilters.map((item) => (
          <Button
            type="button"
            key={item.value}
            onClick={() => handleTypeClick(item.value)}
            className={`${
              active === item.value
                ? "bg-primary-500 text-light-900 "
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500  "
            } light-border-2 px-5 py-2 capitalize rounded-2xl small-medium dark:text-light-800  dark:hover:text-primary-500 `}
          >
            {" "}
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
