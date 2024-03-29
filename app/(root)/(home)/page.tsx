import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import QuestionCard from "@/components/shared/card/QuestionCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";

import Link from "next/link";
const metadata: Metadata = {
  title: "Dev Overflow - Your Technical Question and Answer Platform",
  description:
    "Empowering the world to develop technology through collective knowledge. Find answers to your technical questions and share your knowledge with others.",
  openGraph: {
    title: "Dev Overflow - Your Technical Question and Answer Platform",
    description:
      "Empowering the world to develop technology through collective knowledge. Find answers to your technical questions and share your knowledge with others.",
    url: "https://www.example.com/home",
    images: [
      {
        url: "https://thecodewiz.com/static/media/top-kids-coding-languages.86a4d500.png",
        width: 800,
        height: 600,
        alt: "Dev Overflow Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Dev Overflow - Your Technical Question and Answer Platform",
    description:
      "Empowering the world to develop technology through collective knowledge. Find answers to your technical questions and share your knowledge with others.",
    images: {
      url: "https://thecodewiz.com/static/media/top-kids-coding-languages.86a4d500.png",
      alt: "Dev Overflow Logo",
    },
    creator: "@devoverflow",
    card: "summary_large_image",
  },
};
export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 ">
        <h1 className="h1-bold text-dark100_light900 ">All Questions</h1>
        <Link
          href="/ask-a-question"
          className="flex justify-end max-sm:w-full "
        >
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 ">
            Ask a Question{" "}
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center ">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for Questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px] "
          containerClasses="hidden max-md:flex "
        />
      </div>{" "}
      <HomeFilters />{" "}
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upVotes={question.upVotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="ask-a-question"
            linkTitle=" Ask a Question"
          />
        )}
      </div>
      <div className="mt-10 ">
        <Pagination
          page={searchParams.page ? parseInt(searchParams.page) : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
}
export const generateMetadata = (): Metadata => {
  return {
    ...metadata,
    metadataBase: new URL("https://www.example.com"),
  };
};
