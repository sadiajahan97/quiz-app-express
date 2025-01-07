import bcrypt from "bcrypt";

export async function compareData(
  data: string,
  hashedData: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(data, hashedData);
    return isMatch;
  } catch (error) {
    console.error("Error comparing data:", error);
    throw new Error("Data comparison failed.");
  }
}

export async function hashData(data: string): Promise<string> {
  try {
    const hashedData = await bcrypt.hash(data, 10);
    return hashedData;
  } catch (error) {
    console.error("Error hashing data:", error);
    throw new Error("Data hashing failed.");
  }
}
