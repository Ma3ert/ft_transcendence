import Cookies from "js-cookie";

export const useAuth = () => {
    const cookieValue = Cookies.get('currentUser');

    if (cookieValue !== undefined) {
        const cookieUser = JSON.parse(cookieValue);
        if (!cookieUser.avatar.includes("http"))
            cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
        console.log("found and refreshed")
        return (cookieUser)
    }
} 