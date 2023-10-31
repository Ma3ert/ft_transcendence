import apiClient from "@/services/requestProcessor";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useSuccess, useFailure } from "./useAlerts";
import { useQueryClient } from "@tanstack/react-query";
import { ChannelsContext, GlobalContext } from "@/context/Contexts";
import { useContext } from "react";
import { AppNavigationContext } from "@/context/Contexts";

const useChannelSettingsManager = (User?: User) => {
  const upgradeUserClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/upgrade/${user.userid}/`);
  const sendChannelEnviteClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/sent/${user.userid}`);
  const acceptChannelEnviteClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/accept`);
  const declineChannelEnviteClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/decline`);
  const toast = useToast();
  const Success = useSuccess();
  const Failure = useFailure();
  const queryClient = useQueryClient();
  const { setFriendsSection } = useContext(AppNavigationContext);
  const { socket } = useContext(GlobalContext);

  const sendChannelEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      sendChannelEnviteClient(user).postData(null),
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["channelSentEnvites"]);
      if (socket) socket!.emit("sendInvite", { receiverId: User!.id });
      toast(Success("Envite to channel sent"));
    },
    onError: (error) => {
      ////console.log(error);
      toast(Failure("Envite to channel failed"));
    },
  });
  const acceptChannelEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      acceptChannelEnviteClient(user).postData(null),
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["channels"]);
      queryClient.invalidateQueries(["channelReceivedEnvites"]);
      setFriendsSection!("channels");
      toast(Success("Envite to channel accepted"));
    },
    onError: (error) => {
      ////console.log(error);
      toast(Failure("Envite to channel failed"));
    },
  });
  const declineChannelEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      declineChannelEnviteClient(user).deleteData(),
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["channelReceivedEnvites"]);
      toast(Success("Envite to channel declined"));
    },
    onError: (error) => {
      ////console.log(error);
      toast(Failure("Envite to channel failed"));
    },
  });

  const acceptProtectedEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      acceptChannelEnviteClient(user)
        .postData({ password: user!.password })
        .then((res) => res.data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["channels"]);
      console.log(data.status);
      if (data.status === "failure") {
        toast.isActive("pop") &&
          toast({
            id: "pop",
            title: "Failure",
            description: "Invalid password",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
      } else {
        toast.isActive("pop") &&
          toast({
            id: "pop",
            title: "Success",
            description: "Envite to channel accepted",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
      }
    },
    onError: (error) => {
      toast.isActive("pop") &&
        toast({
          id: "pop",
          title: "Error",
          description: "Envite to channel failed",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
    },
  });

  function sendChannelEnvite(user: UserChannel) {
    sendChannelEnviteMutation.mutate(user);
  }

  function acceptChannelEnvite(user: UserChannel) {
    acceptChannelEnviteMutation.mutate(user);
  }

  function declineChannelEnvite(user: UserChannel) {
    declineChannelEnviteMutation.mutate(user);
  }

  function acceptProtectedEnvite(user: UserChannel) {
    acceptProtectedEnviteMutation.mutate(user);
  }

  return {
    sendChannelEnvite,
    acceptChannelEnvite,
    declineChannelEnvite,
    acceptProtectedEnvite,
  };
};

export default useChannelSettingsManager;
