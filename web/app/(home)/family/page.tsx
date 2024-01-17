import { CreateButton } from "@/components/create-button";
import { columns } from "@/components/family/columns";
import { DataTable } from "@/components/family/data-table";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { getAllMFamily } from "@/lib/features/family/all-family";

export default async function FamilyPage() {
  const data = await getAllMFamily();

  return (
    <Shell>
      <Header
        heading="Family"
        text="Create and manager AHEZA SF Family with members"
      >
        <CreateButton link="/new-family" text="New family" />
      </Header>

      <div className="container mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </Shell>
  );
}
