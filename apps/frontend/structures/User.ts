import type { APIProfile } from "types/APIProfiile";
import type { APIUser } from "types/APIUser";
import { UserRole } from "types/UserRole";

export class User {
  private _id: number;
  private _profile: APIProfile;
  private _roles: UserRole[];
  public constructor(user: APIUser) {
    this._id = user.id;
    this._profile = user.profile;
    this._roles = user.roles;
  }

  public get id(): number {
    return this._id;
  }
  public get profile(): APIProfile {
    return this._profile;
  }
  public get roles(): UserRole[] {
    return this._roles;
  }
  public getRolesString(): string[] {
    return this._roles.map((role) => {
      switch (role) {
        case UserRole.STUDENT:
          return "學生";
        case UserRole.TEACHER:
          return "老師";
        case UserRole.ADMIN:
          return "管理員";
      }
    });
  }
}
