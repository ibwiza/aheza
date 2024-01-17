import { CreateButton } from "@/components/create-button";
import { Header } from "@/components/header";
import { columns } from "@/components/member/columns";
import { DataTable } from "@/components/member/data-table";
import { Shell } from "@/components/shall";
import { getAllMember } from "@/lib/features/member/all-members";

export default async function DemoPage() {
  const data = await getAllMember();

  return (
    <Shell>
      <Header heading="Member" text="Create and manager AHEZA SF members">
      </Header>

      <div className="container mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </Shell>
  );
}
