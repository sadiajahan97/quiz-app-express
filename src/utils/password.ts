import bcrypt from "bcrypt";

export async function comparePasswords(
  rawPassword: string,
  hashedPassword: string
) {
  try {
    const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Password comparison failed.");
  }
}

export async function hashPassword(rawPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed.");
  }
}
