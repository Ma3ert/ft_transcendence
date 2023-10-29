import { AuthUser } from "@/context/Contexts";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UpdateCurrentUser } from "./UpdateCurrentUser";

export const useAuth = () => {
  const { currentUser, updateUser } = useContext(AuthUser);
  if (!{ currentUser, updateUser }) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return { currentUser, updateUser };
};
