import apiClient from "@/services/requestProcessor";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";


const useUserOptions = () => {
  const enviteUserClient = new apiClient("/invites");
  const blockUserClient = new apiClient("/users/block");
  const toast = useToast();
  const queryClient = useQueryClient();

  const enviteUser = async (user: User) => {
    const response = await enviteUserClient.postData({ invitedUser: user.id });
    return response;
  };
  const EnviteUserMutation = useMutation({
    mutationFn: enviteUser,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("sentEnvites");
      toast({
        title: "Friend request sent.",
        description: "Your friend request has been sent successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred.",
        description: "Your friend request has not been sent.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    },
  });

  const blockUserMutation = useMutation({
    mutationFn: async (userid: string) =>
      blockUserClient
        .postData({ userId: userid })
        .then((response) => response),
    onSuccess: (data) => {
      console.log(data);
        queryClient.invalidateQueries("friends");
        queryClient.invalidateQueries ("users");
      toast({
        title: "User blocked.",
        description: "The user has been blocked successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  function EnviteUser(user: User) {
    EnviteUserMutation.mutate(user);
  }
  function BlockUser (user:User)
  {
    blockUserMutation.mutate(user.id);
  }

  return { EnviteUser , BlockUser};
};

export default useUserOptions;
