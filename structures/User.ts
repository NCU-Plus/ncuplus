import { APIUser } from "~~/types/APIUser";

export class User {
  private _id: number;
  private _name: string;
  public constructor(user: APIUser) {
    this._id = user.id;
    this._name = user.name;
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
}
