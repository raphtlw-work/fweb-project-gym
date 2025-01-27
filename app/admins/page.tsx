import { Sidebar } from "@/components/sidebar";
import { connectToDatabase } from "@/lib/db";
import { AdminDashboard } from "./admin-dashboard";
import { Admin } from "@/lib/schema";

export default async function AdminPage() {
  const db = await connectToDatabase();
  const admins = (await db.collection("admins").find().toArray()).map(
    (admin) => {
      const { _id, ...rest } = admin;

      return { ...rest, id: _id.toString() };
    }
  ) as Admin[];

  return (
    <div className='flex h-screen bg-background'>
      <Sidebar />
      <AdminDashboard admins={admins} />
    </div>
  );
}
