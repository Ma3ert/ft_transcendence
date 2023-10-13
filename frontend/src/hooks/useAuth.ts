import Cookies from "js-cookie";

export const useAuth = () => {
    const cookieValue = Cookies.get('currentUser');

    if (cookieValue !== undefined) {
        // Cookie exists, proceed with parsing
        const cookieUser = JSON.parse(cookieValue);
        cookieUser.avatar = "http://localhost:3000/public/users/imgs/" + cookieUser.avatar
        console.log("found and refreshed")
        return (cookieUser)
    }
} 