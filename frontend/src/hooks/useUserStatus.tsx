import apiClient from "@/services/requestProcessor";
import { useState } from "react";
import { useQuery } from "react-query";

const useUserStatus = (user: User) => {
  const [userIsBlocked, setUserIsBlocked] = useState(false);
  const userIsBlockedClient = (userid: string) =>
    new apiClient(`/users/block/${userid}`);

  useQuery({
    queryKey: ["userIsBlocked", user.id],
    queryFn: async () =>
      userIsBlockedClient(user.id)
        .getData()
        .then((res) => res.data),
    onSuccess: (data: any) => {
      setUserIsBlocked(data.blocked);
    },
    onError: (err) => {
      //console.log (err)
    },
  });

  return { userIsBlocked };
};

export default useUserStatus;
