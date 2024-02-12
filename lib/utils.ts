import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimeAgo = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day; // Assuming a month has approximately 30 days
  const year = 365 * day; // Assuming a year has approximately 365 days

  if (timeDifference < minute) {
    const seconds = Math.floor(timeDifference / second);
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < week) {
    const days = Math.floor(timeDifference / day);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < month) {
    const weeks = Math.floor(timeDifference / week);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (timeDifference < year) {
    const months = Math.floor(timeDifference / month);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(timeDifference / year);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const formatBigNumber = (num: number | string): string => {
  const numericValue = typeof num === "string" ? parseFloat(num) : num;

  if (numericValue >= 1e6) {
    return (numericValue / 1e6).toFixed(1) + "M";
  } else if (numericValue >= 1e3) {
    return (numericValue / 1e3).toFixed(1) + "K";
  } else {
    return numericValue?.toString();
  }
};
export const getJoinededDate = (dateObject: Date): string => {
  // Get month and year from the Date object
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();

  // Join the month and year
  const formattedDate = `Joined ${month} ${year}`;

  return formattedDate;
};

interface UrlQueryParams {
  value: string | null;
  key: string;
  params: string;
}
export const formUrlQuery = ({ value, key, params }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    { query: currentUrl, url: window.location.pathname },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  keysToRemove: string[];
  params: string;
}
export const removeKeysFromQuery = ({
  keysToRemove,
  params,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    { query: currentUrl, url: window.location.pathname },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}
export const assignBadges = (params: BadgeParam) => {
  const BadgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;
  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((level: any) => {
      if (count >= badgeLevels[level]) {
        BadgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return BadgeCounts;
};

interface Props {
  query: string;
  filter: string | undefined;
  page: number;
}
export const jobSearch = async ({ query, filter, page }: Props) => {
  try {
    const [countriesResponse, locationResponse] = await Promise.all([
      fetch("https://restcountries.com/v3.1/all?fields=name,flags"),
      fetch("http://ip-api.com/json"),
    ]);

    const userLocation = await locationResponse.json();
    const countriesData = await countriesResponse.json();

    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}%20in%20${filter || userLocation.country}&page=${page}&num_pages=1`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${process.env.JSEARCH_API_KEY}`,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    const responseData = await response.json();
    const data = responseData.data;

    const countriesFilter = countriesData.map(
      (country: { name: { common: any }; flags: { png: any } }) => ({
        name: country.name.common,
        flags: country.flags.png,
        value: country.name.common,
      })
    );

    const filteredLocation = countriesFilter.filter((location: any) =>
      location.name
        .toLowerCase()
        .includes(filter || userLocation.country.toLowerCase())
    );

    const flagUrl = filteredLocation[0]?.flags;
    return { flagUrl, countriesFilter, data };
  } catch (error) {
    throw error;
  }
};
