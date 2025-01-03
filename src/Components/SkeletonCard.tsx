import { Skeleton } from "@/Components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col p-6 space-y-4">
      {/* Main skeleton block */}
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>

        {/* Additional skeleton blocks */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>

        {/* Additional skeleton blocks */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>
      </div>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>

        {/* Additional skeleton blocks */}
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[150px] w-full md:h-[200px] md:w-[300px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70%] md:w-[80%]" />
            <Skeleton className="h-4 w-[60%] md:w-[70%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
