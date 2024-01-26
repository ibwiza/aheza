import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { FamilyForm } from "@/components/family/family-form";
import { TypeForm } from "@/components/type/create-type-form";

export const metadata = {
  title: "New Type",
};

export default async function NewTypePage() {
  return (
    <Shell>
      <Header heading="Type" text="Create new contribition type " />
      <div className="grid gap-10">
        <TypeForm />
      </div>
    </Shell>
  );
}
