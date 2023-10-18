import { AuthUser } from "@/context/Contexts";
import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUpdateCurrentUser } from "@/hooks/useUpdateCurrentUser";
import { useRouter } from "next/navigation";
import Loading from "../../app/loading";


interface UserAuthProps {
    children: ReactNode;
}

// async function returnFromCookie() {
//     const cookieValue = Cookies.get('jwt');
//     var toReturn;

//     if (cookieValue !== undefined && !toReturn) {
//         await useUpdateCurrentUser().then((res) => {toReturn  = res})
//     }
//     return (toReturn)
// }

const AuthUserProvider = ({ children }: UserAuthProps) => {
    const [currentUser, setCurrentUser] = useState<any>();
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const updateUser = async () => {
        const cookieValue = Cookies.get('jwt');
        if (cookieValue !== undefined) {
            console.log("hoho")
            console.log(cookieValue)
            if (cookieValue !== "")
                useUpdateCurrentUser().then((res) => {setCurrentUser(res); setLoading(false)}).catch((err) => console.log(err));
            else
                setLoading(false);
        //     if (!cookieUser.avatar.includes("http"))
        //         cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
            // console.log("the user is known")
        }
        else {
            setLoading(false)
            router.push("/");
        }
    }

    useEffect(() => {
        updateUser();
    }, [])
    return (
        <AuthUser.Provider value={ {currentUser, updateUser} }>
            { loading ? <Loading/> : children }
        </AuthUser.Provider>
    )
}

export default AuthUserProvider