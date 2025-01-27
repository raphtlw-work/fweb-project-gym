import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Equipment } from "@/lib/schema";
import { calculateEquipmentHealth } from "@/lib/utils";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const equipment = await db.collection("equipment").find().toArray();
    const equipmentWithHealth = equipment.map((item) => ({
      ...item,
      id: item._id.toString(),
      health: calculateEquipmentHealth(
        item.lastMaintainedAt,
        item.maintenanceDate
      ),
    }));
    return NextResponse.json(equipmentWithHealth);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return NextResponse.json(
      { error: "Failed to fetch equipment" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: Omit<Equipment, "_id"> = await req.json();
    const db = await connectToDatabase();
    const result = await db.collection("equipment").insertOne(body);
    const insertedEquipment = {
      ...body,
      id: result.insertedId.toString(),
    };
    return NextResponse.json(
      { message: "Equipment added successfully", result: insertedEquipment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding equipment:", error);
    return NextResponse.json(
      { error: "Failed to add equipment" },
      { status: 500 }
    );
  }
}
