import bcrypt from "bcrypt";

export async function comparePassword(
  rawPassword: string,
  hashedPassword: string
) {
  const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
  return isMatch;
}

export async function hashPassword(rawPassword: string) {
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  return hashedPassword;
}
