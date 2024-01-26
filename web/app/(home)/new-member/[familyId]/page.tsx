import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { MemberForm } from "@/components/member/member-form";

export const metadata = {
  title: "New Member",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Shell>
      <Header heading="Member" text="Create new member " />
      <div className="grid gap-10">
        <MemberForm />
        </div>
    </Shell>
  );
}
