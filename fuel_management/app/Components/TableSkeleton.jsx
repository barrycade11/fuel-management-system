import { Card, Skeleton } from "@heroui/react";

export default function TableSkeleton({ columns = 4, rows = 4 }) {
  return (
    <Card className="p-4 w-full">
      
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-8 w-32 rounded-lg mb-4">
            <div className="h-8 w-32 bg-default-300 rounded-lg" />
        </Skeleton>
        <div className="flex gap-2">
            <Skeleton className="h-8 w-32 rounded-lg mb-4">
                <div className="h-8 w-32 bg-default-300 rounded-lg" />
            </Skeleton>
            <Skeleton className="h-8 w-32 rounded-lg mb-4">
                <div className="h-8 w-32 bg-default-300 rounded-lg" />
            </Skeleton>
        </div>
      </div>

      <div className="w-full border border-default-300 rounded-lg">
        {/* Table Header */}
        <div className="flex justify-between p-3 bg-default-200 rounded-t-lg">
          {[...Array(columns)].map((_, index) => (
            <Skeleton key={index} className="w-1/5 h-6 rounded-md">
              <div className="h-6 bg-default-300 rounded-md" />
            </Skeleton>
          ))}
        </div>

        {/* Table Rows */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-between p-3 border-t">
            {[...Array(columns)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="w-1/5 h-5 rounded-md">
                <div className="h-5 bg-default-200 rounded-md" />
              </Skeleton>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
