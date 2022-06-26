import { APIProfile } from "./APIProfiile";
import { UserRole } from "./UserRole";

export interface APIUser {
  id: number;
  role: UserRole;
  profile: APIProfile;
}
