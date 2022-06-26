import { APIProfile } from "~~/types/APIProfiile";
import { APIUser } from "~~/types/APIUser";
import { UserRole } from "~~/types/UserRole";

export class User {
  private _id: number;
  private _profile: APIProfile;
  private _role: UserRole;
  public constructor(user: APIUser) {
    this._id = user.id;
    this._profile = user.profile;
    this._role = user.role;
  }

  public get id(): number {
    return this._id;
  }
  public get profile(): APIProfile {
    return this._profile;
  }
  public get role(): UserRole {
    return this._role;
  }
  public getRoleString(): string {
    switch (this._role) {
      case UserRole.STUDENT:
        return "學生";
      case UserRole.TEACHER:
        return "老師";
      case UserRole.ADMIN:
        return "管理員";
    }
  }
}
