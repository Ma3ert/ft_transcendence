import { AuthUser } from "@/context/Contexts";
import Cookies from "js-cookie";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AuthUser);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 