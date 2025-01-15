import bcrypt from "bcrypt";

export async function compareData(
  data: string,
  hashedData: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(data, hashedData);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error comparing data by bcrypt:", error.message);
    }

    return false;
  }
}

export async function hashData(data: string): Promise<string> {
  try {
    return await bcrypt.hash(data, 10);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error hashing data by bcrypt:", error.message);
    }

    return "";
  }
}
