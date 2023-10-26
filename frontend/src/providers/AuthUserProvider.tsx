import { AuthUser } from "@/context/Contexts";
import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useUpdateCurrentUser } from "@/hooks/useUpdateCurrentUser";
import { useRouter } from "next/navigation";
import Loading from "../../app/loading";

interface UserAuthProps {
  children: ReactNode;
}

const AuthUserProvider = ({ children }: UserAuthProps) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateUser = async () => {
    const cookieValue = Cookies.get("jwt");
    if (cookieValue !== undefined) {
      console.log(cookieValue);
      if (cookieValue !== "")
        useUpdateCurrentUser()
          .then((res) => {
            if (!res.user.avatar.includes("http"))
              res.user.avatar =
                "http://e1r9p3.1337.ma:3000/public/users/imgs/" +
                res.user.avatar;
            setCurrentUser(res);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      else setLoading(false);
    } else {
      setLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    updateUser();
  }, []);
  return (
    <AuthUser.Provider value={{ currentUser, updateUser }}>
      {loading ? <Loading /> : children}
    </AuthUser.Provider>
  );
};

export default AuthUserProvider;
