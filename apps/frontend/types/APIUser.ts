import type { APIProfile } from "./APIProfiile";
import { UserRole } from "./UserRole";

export interface APIUser {
  id: number;
  roles: UserRole[];
  profile: APIProfile;
}
