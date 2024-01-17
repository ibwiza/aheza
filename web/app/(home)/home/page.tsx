import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { getUserContribution } from "@/lib/features/contribution/user-contribution";
import { Shell } from "@/components/shall";
import { Header } from "@/components/header";
import { Contribution } from "@/types";
import { ContributionItem } from "@/components/contribution/contribution-item";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

export const metadata = {
  title: "Home",
};

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const contributions = await getUserContribution();

  return (
    <Shell>
      <Header heading="Contribution" text="List of my monthly contribution.">
        {/* <CleamCreateButton /> */}
      </Header>
      <div>
        {contributions?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {contributions.map((contribution: Contribution) => (
              <ContributionItem
                key={contribution.cid}
                contribution={contribution}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="sprayCan" />
            <EmptyPlaceholder.Title>
              No Contribution created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any contribution yet. Start submit
              contribution.
            </EmptyPlaceholder.Description>
            {/* <PostCreateButton variant="outline" /> */}
          </EmptyPlaceholder>
        )}
      </div>
    </Shell>
  );
}
