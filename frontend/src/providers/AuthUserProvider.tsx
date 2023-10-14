import { AuthUser } from "@/context/Contexts";
import { ReactNode, useState } from "react";
import Cookies from "js-cookie";


interface UserAuthProps {
    children: ReactNode;
}

function returnFromCookie() {
    const cookieValue = Cookies.get('currentUser');
        
    if (cookieValue !== undefined) {
        const cookieUser = JSON.parse(cookieValue);
        if (!cookieUser.avatar.includes("http"))
            cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
        console.log("found and refreshed")
        return (cookieUser)
    }
    else{
        return (null)
    } 
}

const AuthUserProvider = ({ children }: UserAuthProps) => {
    const [currentUser, setCurrentUser] = useState(returnFromCookie());

    const updateUser = () => {

        const cookieValue = Cookies.get('currentUser');
        
        if (cookieValue !== undefined) {
            const cookieUser = JSON.parse(cookieValue);
            if (!cookieUser.avatar.includes("http"))
                cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
            console.log("found and refreshed")
            setCurrentUser(cookieUser);
            console.log("its setted")
        }
        else{
            console.log("its not setted")
            setCurrentUser(null);
        }
    }
    return (
        <AuthUser.Provider value={ {currentUser, updateUser} }>
            { children }
        </AuthUser.Provider>
    )
}

export default AuthUserProvider