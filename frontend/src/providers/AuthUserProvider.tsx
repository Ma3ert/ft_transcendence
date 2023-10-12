import { AuthUser } from "@/context/Contexts";
import { ReactNode, useState } from "react";

interface UserAuthProps {
    children: ReactNode;
}

const AuthUserProvider = ({ children }: UserAuthProps) => {
    const [currentUser, setCurrentUser] = useState(null);
    return (
        <AuthUser.Provider value={ {currentUser, setCurrentUser} }>
            { children }
        </AuthUser.Provider>
    )
}

export default AuthUserProvider