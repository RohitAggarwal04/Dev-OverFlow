"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import Image from "next/image";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  title?: string;
}
const Filter = ({ filters, otherClasses, containerClasses, title }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramFilter = searchParams.get("filter");

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
    <div className={`relative ${containerClasses} `}>
      <Select
        onValueChange={(value) => handleTypeClick(value)}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} w-full body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 `}
        >
          <div className="line-clamp-1 flex gap-2 flex-1 text-left ">
            {title && (
              <Image
                src="/assets/icons/location.svg"
                alt="icon"
                width={20}
                height={20}
              />
            )}

            <SelectValue placeholder={title ? title : "Filter"} />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {item.name}{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
