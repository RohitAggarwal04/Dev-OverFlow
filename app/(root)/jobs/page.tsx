import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import JobCard from "@/components/shared/card/JobCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { SearchParamsProps } from "@/types";
import React from "react";

const page = async ({ searchParams }: SearchParamsProps) => {
  let countriesFilter: any;
  let userLocation: any;
  let flagUrl: string;
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );
    const Location = await fetch("http://ip-api.com/json");
    userLocation = await Location.json();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    countriesFilter = data.map(
      (country: { name: { common: any }; flags: { png: any } }) => ({
        name: country.name.common,
        flags: country.flags.png,
        value: country.name.common,
      })
    );

    const location = countriesFilter.filter((location: any) =>
      location.name
        .toLowerCase()
        .includes(searchParams.filter || userLocation.country.toLowerCase())
    );

    flagUrl = location[0]?.flags;
  } catch (error) {
    console.error("Fetch error:", error);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`,
    {
      method: "POST",
      body: JSON.stringify({
        searchQuery: searchParams.q || "developer",
        filter: searchParams.filter || userLocation.country,
        page: searchParams.page ? parseInt(searchParams.page) : 1,
      }),
    }
  );
  const responseData = await response.json();

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job title, Company or Keywords"
          otherClasses="flex-1"
        />

        <Filter
          title={`Select a location`}
          filters={countriesFilter}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {responseData?.result?.data?.length > 0 ? (
          <>
            {responseData.result.data.map((item: any, i: number) => (
              <JobCard
                key={i}
                imgUrl={item.employer_logo}
                title={item.job_title}
                description={item.job_description}
                location={{
                  state: item.job_state,
                  country: item.job_country,
                }}
                flagUrl={flagUrl && flagUrl}
                employment={item.job_employment_type}
                apply_link={item.job_apply_link}
              />
            ))}{" "}
            <div className="mt-10 ">
              <Pagination
                page={searchParams.page ? parseInt(searchParams.page) : 1}
                isNext={searchParams.page || 1 < 21 ? true : false}
              />
            </div>
          </>
        ) : (
          <div className="items-center mt-3 ">
            <p className="text-center text-dark300_light700 ">
              Oops! We couldn't find any jobs at the moment. Please try again
              later
            </p>{" "}
            <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-400/50 " />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
