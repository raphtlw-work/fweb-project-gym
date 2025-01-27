import { Sidebar } from "@/components/sidebar";
import { connectToDatabase } from "@/lib/db";
import { EquipmentDashboard } from "./equipment-dashboard";
import { Equipment } from "@/lib/schema";

export default async function EquipmentPage() {
  const db = await connectToDatabase();
  const equipment = (await db.collection("equipment").find().toArray()).map(
    (equipment) => {
      const { _id, ...rest } = equipment;

      return { ...rest, id: _id.toString() };
    }
  ) as Equipment[];

  return (
    <div className='flex h-screen bg-background'>
      <Sidebar />
      <EquipmentDashboard equipments={equipment} />
    </div>
  );
}
