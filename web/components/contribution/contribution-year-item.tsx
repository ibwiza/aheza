import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Contribution } from "@/types";

interface ContributionItemProps {
  contribution: Pick<
    Contribution,
    "id" | "amount" | "year" | "createdAt" | "month" | "paymentMethod"
  >;
}

export function ContributionYearItem({ contribution }: ContributionItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${contribution.id}`}
          className="font-semibold hover:underline"
        >
          {contribution.paymentMethod} ({contribution.amount} )
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
             {contribution.year}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {formatDate(new Date(contribution.createdAt)?.toDateString())}
      </p>
      {/* <PostOperations post={{ id: post.id, title: post.title }} /> */}
    </div>
  );
}

ContributionYearItem.Skeleton = function ContributionItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
