import { AuthUser } from "@/context/Contexts";
import { ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { useUpdateCurrentUser } from "@/hooks/useUpdateCurrentUser";


interface UserAuthProps {
    children: ReactNode;
}

async function returnFromCookie() {
    const cookieValue = Cookies.get('jwt');
    const [toReturn, setReturn] = useState(null);

    if (cookieValue !== undefined && !toReturn) {
        console.log("i get here");
        await useUpdateCurrentUser().then((res) => {console.log("res: ", res); setReturn(res)})
        // const cookieUser = JSON.parse(cookieValue);
        // if (!cookieUser.avatar.includes("http"))
        //     cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
        // return (cookieUser)
    }
    return (toReturn)
}

const AuthUserProvider = ({ children }: UserAuthProps) => {
    var fromReturn;
    returnFromCookie().then((res) => {fromReturn = res});
    const [currentUser, setCurrentUser] = useState<any>(fromReturn);

    const updateUser = () => {
        const cookieValue = Cookies.get('jwt');
        if (cookieValue !== undefined) {
        //     const cookieUser = JSON.parse(cookieValue);
        //     if (!cookieUser.avatar.includes("http"))
        //         cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
            useUpdateCurrentUser().then((res) => {console.log("from res: ",res); setCurrentUser(res)});
        }
        else {
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