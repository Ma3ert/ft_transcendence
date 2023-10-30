import apiClient from "@/services/requestProcessor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { AppNavigationContext } from "@/context/Contexts";
const useEnviteHandler = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const acceptEnvitationClient = new apiClient("/invites/accept");
  const deleteEnvitationClient = (enviteId: string) =>
    new apiClient(`/invites/${enviteId}`);
  const cancelEnvitationClient = new apiClient("");
  const acceptChannelEnvitationClient = new apiClient("");
  const declineChannelEnvitationClient = new apiClient("");
  const cancelChannelEnvitationClient = new apiClient("");
  const acceptProtectedChannelClient = new apiClient("");
  const { setFriendsSection } = useContext(AppNavigationContext);

  const acceptEnvitation = async (enviteId: string) => {
    const response = await acceptEnvitationClient.postData({
      inviteId: enviteId,
    });
    return response;
  };
  const acceptEnvitationMutation = useMutation({
    mutationFn: acceptEnvitation,
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["sentEnvites"]);
      queryClient.invalidateQueries(["recievedEnvites"]);
      queryClient.invalidateQueries(["friends"]);
      setFriendsSection!("friends");
      toast({
        title: "Friend request accepted.",
        description: "You have a new friend.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const deleteEnvitation = async (enviteId: string) => {
    const response = await deleteEnvitationClient(enviteId).deleteData();
    return response;
  };
  const deleteEnvitationMutation = useMutation({
    mutationFn: deleteEnvitation,
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["sentEnvites"]);
      queryClient.invalidateQueries(["recievedEnvites"]);
      toast({
        title: "Friend request deleted.",
        description: "You have deleted a friend request.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  function AcceptFriendRequest(enviteId: string) {
    acceptEnvitationMutation.mutate(enviteId);
  }
  function DeleteFriendRequest(enviteId: string) {
    deleteEnvitationMutation.mutate(enviteId);
  }
  return { AcceptFriendRequest, DeleteFriendRequest };
};

export default useEnviteHandler;
