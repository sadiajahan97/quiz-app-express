import bcrypt from "bcrypt";

export async function comparePassword(
  rawPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch: boolean = await bcrypt.compare(rawPassword, hashedPassword);
  return isMatch;
}

export async function hashPassword(rawPassword: string): Promise<string> {
  const hashedPassword: string = await bcrypt.hash(rawPassword, 10);
  return hashedPassword;
}
