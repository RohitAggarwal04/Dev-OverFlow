import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 mb-12 flex flex-wrap max-sm:flex-col gap-5 ">
        <Skeleton className="h-14 sm:flex-1 max-sm:w-full " />
        <Skeleton className="h-14 w-28  max-sm:w-full " />
      </div>{" "}
      <section className="mt-12 flex flex-wrap gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton
            key={item}
            className="h-50 w-full sm:w-[200px] rounded-2xl "
          />
        ))}
      </section>{" "}
    </>
  );
}
