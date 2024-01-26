import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Contribution, ContributionResponse } from "@/types";
import { Progress } from "../ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { yearContributions } from "@/lib/features/contribution/year-contributions";
import { ContributionYearItem } from "./contribution-year-item";
import { Header } from "../header";
import { Separator } from "../ui/separator";

interface ContributionItemProps {
  contribution: Pick<ContributionResponse, "_sum" | "year" | "memberId">;
}
export async function ContributionItem({
  contribution,
}: ContributionItemProps) {
  const percentage = (contribution._sum.amount * 100) / 36000;
  const contributions = await yearContributions(
    contribution.year,
    contribution.memberId
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <Link href="" className="font-semibold hover:underline">
              {contribution._sum.amount} RWF
            </Link>
            <div>
              <p className="text-sm text-muted-foreground">
                {" "}
                Year: {contribution.year}
              </p>
            </div>
          </div>
          <Progress value={percentage} className="w-[60%]" />
          <p>{percentage.toPrecision(3)} %</p>
          <p className="text-sm text-muted-foreground">{36000} RWF</p>
        </AccordionTrigger>
        <AccordionContent>
          <Separator />

          <Header
            heading=""
            text={`List of contribution of ${contribution.year}`}
          >
            {/* <CleamCreateButton /> */}
          </Header>
          <div className="divide-y divide-border rounded-md border">
            {contributions.map((contribution: Contribution) => (
              <ContributionYearItem
                key={contribution.year}
                contribution={contribution}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

ContributionItem.Skeleton = function ContributionItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
