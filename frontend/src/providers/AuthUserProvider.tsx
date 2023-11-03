import { AuthUser } from "@/context/Contexts";
import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UpdateCurrentUser } from "@/hooks/UpdateCurrentUser";
import { useRouter } from "next/navigation";
import Loading from "../../app/loading";

interface UserAuthProps {
  children: ReactNode;
}

const AuthUserProvider = ({ children }: UserAuthProps) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUnAuth = () => {
    setLoading(false);
    setCurrentUser(undefined);
    router.push("/");
  }
  const updateUser = async () => {
    const cookieValue = Cookies.get("jwt");
    if (cookieValue !== undefined) {
      ////console.log(cookieValue);
      if (cookieValue !== "") {
        UpdateCurrentUser()
          .then((res) => {
            if (!res.user.avatar.includes("http"))
              res.user.avatar =
                "http://e1r9p5.1337.ma:3000/public/users/imgs/" +
                res.user.avatar;
            setCurrentUser(res);
            setLoading(false);
          })
          .catch((err) => {
            handleUnAuth()
          });
        } else {
          handleUnAuth()
        }
    } else {
      handleUnAuth()
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
