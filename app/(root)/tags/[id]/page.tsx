import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import QuestionCard from "@/components/shared/card/QuestionCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";

export default async function Home({ params, searchParams }: URLProps) {
  const { tagTitle, questions, isNext } = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 ">{tagTitle}</h1>
      <div className="mt-11 w-full ">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions..."
          otherClasses="flex-1"
        />
      </div>{" "}
      <div className="mt-10 flex w-full flex-col gap-6 ">
        {questions.length > 0 ? (
          questions.map((question: any) => (
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
            title="There's no tag question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="ask-a-question"
            linkTitle=" Ask a Question"
          />
        )}
      </div>{" "}
      <div className="mt-10 ">
        <Pagination
          page={searchParams.page ? parseInt(searchParams.page) : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}
