import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { FamilyForm } from "@/components/family/family-form";

export const metadata = {
  title: "New Family",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Shell>
      <Header heading="Family" text="Create new family " />
      <div className="grid gap-10">
        <FamilyForm />
      </div>
    </Shell>
  );
}
