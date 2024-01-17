import { CreateButton } from "@/components/create-button";
import { Header } from "@/components/header";
import { Shell } from "@/components/shall";
import { columns } from "@/components/type/columns";
import { DataTable } from "@/components/type/data-table";
import { getAllType } from "@/lib/features/type/all-type";

export default async function FamilyPage() {
  const data = await getAllType();

  return (
    <Shell>
      <Header
        heading="Type"
        text="Create and manager AHEZA SF contribution type"
      >
        <CreateButton link="/new-type" text="New Type" />
      </Header>

      <div className="container mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </Shell>
  );
}
