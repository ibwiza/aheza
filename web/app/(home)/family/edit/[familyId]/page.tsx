import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { EditFamilyForm } from "@/components/family/edit-family-form";

export const metadata = {
  title: "Edit Family",
};

export default async function EditFamilyPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Shell>
      <Header heading="Family" text="Create new family " />
      <div className="grid gap-10">
        <EditFamilyForm />
      </div>
    </Shell>
  );
}
