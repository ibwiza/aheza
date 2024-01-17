import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { ContributionForm } from "@/components/contribution/create-contribution-form";

export const metadata = {
  title: "New Contribution",
};

export default async function NewContributionPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Shell>
      <Header heading="Contribution" text="Create new contribtion " />
      <div className="grid gap-10">
        <ContributionForm />
      </div>
    </Shell>
  );
}
