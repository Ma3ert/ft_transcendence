import apiClient from "@/services/requestProcessor";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
const useBlockedUsers = () => {
  const client = new apiClient("/users/block");
  const [blockedUsers, setBlockedUsers] = useState<User[]>([]);

  useQuery({
    queryKey: ["blockedUser"],
    queryFn: async () => client.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      setBlockedUsers(data);
    },
    onError: (err: any) => {
      ////console.log (err)
    },
  });
  return { blockedUsers };
};

export default useBlockedUsers;
