import { CreateButton } from "@/components/create-button";
import { Header } from "@/components/header";
import { columns } from "@/components/member/columns";
import { DataTable } from "@/components/member/data-table";
import { familyColumn } from "@/components/member/family-columns";
import { Shell } from "@/components/shall";
import { getAllMember } from "@/lib/features/member/all-members";
import { getAllFamilyMember } from "@/lib/features/member/family-members";
import { getCurrentUser } from "@/lib/session";

export default async function DemoPage() {
  const user = await getCurrentUser();

  const allMember = await getAllMember();
  const familyMember = await getAllFamilyMember();

  return (
    <Shell>
      <Header
        heading="Member"
        text="Create and manager AHEZA SF members"
      ></Header>

      <div className="container mx-auto ">
        {(() => {
          if (user.role === "PARENT") {
            return <DataTable columns={familyColumn} data={familyMember} />;
          } else {
            return <DataTable columns={columns} data={allMember} />;
          }
        })()}
      </div>
    </Shell>
  );
}
