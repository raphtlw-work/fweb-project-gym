export async function addEquipment(equipment: Omit<Equipment, "id">) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("equipment");

    const result = await collection.insertOne(equipment);

    if (!result.insertedId) {
      throw new Error("Failed to add equipment");
    }

    revalidatePath("/equipment");

    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error("Failed to add equipment:", error);
    throw new Error("Failed to add equipment");
  }
}
