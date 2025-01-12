import { TokenPayload } from "./jsonwebtoken";

export interface Authentication {
  user: TokenPayload;
}
