import { APIProfile } from "~~/types/APIProfiile";
import { APIUser } from "~~/types/APIUser";

export class User {
  private _id: number;
  private _profile: APIProfile;
  public constructor(user: APIUser) {
    this._id = user.id;
    this._profile = user.profile;
  }

  public get id(): number {
    return this._id;
  }
  public get profile(): APIProfile {
    return this._profile;
  }
}
