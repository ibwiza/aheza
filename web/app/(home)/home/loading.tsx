import { ContributionItem } from "@/components/contribution/contribution-item";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";

export default function Loading() {
  return (
    <Shell>
      <Header heading="Contribution" text="Member contribution.">
        {/* <PostCreateButton /> */}
      </Header>
      <div className="divide-border-200 divide-y rounded-md border">
        <ContributionItem.Skeleton />
        <ContributionItem.Skeleton />
        <ContributionItem.Skeleton />
        <ContributionItem.Skeleton />
        <ContributionItem.Skeleton />
      </div>
    </Shell>
  );
}
