import { AuthUser } from "@/context/Contexts";
import { ReactNode, useState } from "react";
import Cookies from "js-cookie"

interface UserAuthProps {
    children: ReactNode;
}

const AuthUserProvider = ({ children }: UserAuthProps) => {
    const [currentUser, setCurrentUser] = useState(null);
    const cookieValue = Cookies.get('currentUser');


    return (
        <AuthUser.Provider value={ {currentUser, setCurrentUser} }>
            { children }
        </AuthUser.Provider>
    )
}

export default AuthUserProvider