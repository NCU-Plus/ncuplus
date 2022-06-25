import { User } from "~/structures/User";

export const useLoggedInUser = () =>
  useState("loggedInUser", (): User | null => null);
