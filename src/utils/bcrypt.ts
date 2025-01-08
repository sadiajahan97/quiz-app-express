import bcrypt from "bcrypt";

export async function compareData(
  data: string,
  hashedData: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(data, hashedData);
  } catch (error) {
    console.error("Error comparing data:", error);

    throw new Error("Data comparison failed.");
  }
}

export async function hashData(data: string): Promise<string> {
  try {
    return await bcrypt.hash(data, 10);
  } catch (error) {
    console.error("Error hashing data:", error);

    throw new Error("Data hashing failed.");
  }
}
