import apiClient from "@/services/requestProcessor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChannelsContext, GlobalContext } from "@/context/Contexts";
import { useContext } from "react";
const useUserOptions = (channel?: Channel, User?: User) => {
  const enviteUserClient = new apiClient("/invites");
  const blockUserClient = new apiClient("/users/block");
  const unblockUserClient = new apiClient("/users/unblock");
  const toast = useToast();
  const queryClient = useQueryClient();
  const { activeChannel } = useContext(ChannelsContext);
  const muteUserClient = (request: UserChannel) =>
    new apiClient(`chat/channels/${request.channelid}/mute/${request.userid}`);
  const banUserClient = (request: UserChannel) =>
    new apiClient(`chat/channels/${request.channelid}/ban/${request.userid}`);
  const unbaneUserClient = (request: UserChannel) =>
    new apiClient(`chat/channels/${request.channelid}/unban/${request.userid}`);
  const kickUserClient = (request: UserChannel) =>
    new apiClient(`chat/channels/${request.channelid}/kick/${request.userid}`);
  const enviteUser = async (user: User) => {
    const response = await enviteUserClient.postData({ invitedUser: user.id });
    return response;
  };
  const { socket } = useContext(GlobalContext);
  const EnviteUserMutation = useMutation({
    mutationFn: enviteUser,
    onSuccess: (data) => {
      ////console.log(data);
      if (socket) socket!.emit("sendInvite", { receiverId: User!.id });
      queryClient.invalidateQueries(["sentEnvites"]);

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
      ////console.log(error);
    },
  });

  const blockUserMutation = useMutation({
    mutationFn: async (userid: string) =>
      blockUserClient.postData({ userId: userid }).then((response) => response),
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["friends"]);
      toast({
        title: "User blocked.",
        description: "The user has been blocked successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
    },
  });

  const UnblockUserMutation = useMutation({
    mutationFn: async (userid: string) =>
      unblockUserClient
        .postData({ userId: userid })
        .then((response) => response),
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["friends"]);
      toast({
        title: "User unblocked.",
        description: "The user has been unblocked successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
    },
  });

  const muteUserMutation = useMutation({
    mutationFn: async (request: UserChannel) =>
      muteUserClient(request)
        .postData(null)
        .then((response) => response),
    onSuccess: (data) => {
      ////console.log(data);
      ////console.log ('channel id is', channel!.id)
      ////console.log ('active channel id', activeChannel!.id)
      queryClient.refetchQueries(["channelMembers", channel!.id]);
      toast({
        title: "User muted.",
        description: "The user has been muted successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
    },
  });

  const banUserMutation = useMutation({
    mutationFn: async (request: UserChannel) =>
      banUserClient(request)
        .postData(null)
        .then((response) => response),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channelMembers", channel!.id]);
      toast({
        title: "User banned.",
        description: "The user has been banned successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
    },
  });

  const unbaneUserMutation = useMutation({
    mutationFn: async (request: UserChannel) =>
      unbaneUserClient(request)
        .deleteData()
        .then((response) => response),
    onSuccess: (data) => {
      ////console.log(data);
      queryClient.invalidateQueries(["channelMembers", channel!.id]);
      toast({
        title: "User unbanned.",
        description: "The user has been unbanned successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      ////console.log(error);
    },
  });

  const KickUserMutation = useMutation({
    mutationFn: (user: UserChannel) => kickUserClient(user).deleteData(),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channelMembers", channel!.id]);
      toast({
        title: "User kicked.",
        description: "The user has been kicked successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "An error occurred.",
        description: "The user has not been kicked.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  function EnviteUser(user: User) {
    EnviteUserMutation.mutate(user);
  }
  function BlockUser(user: User) {
    blockUserMutation.mutate(user.id);
  }
  function UnblockUser(user: User) {
    UnblockUserMutation.mutate(user.id);
  }
  function MuteUser(request: UserChannel) {
    muteUserMutation.mutate(request);
  }
  function BanUser(request: UserChannel) {
    banUserMutation.mutate(request);
  }
  function UnbanUser(request: UserChannel) {
    unbaneUserMutation.mutate(request);
  }

  function KickUser(user: UserChannel) {
    socket!.emit ("UserKick", {
      userId:user.userid,
      channelId:user.channelid
    })
    KickUserMutation.mutate(user);
  }
  return {
    EnviteUser,
    BlockUser,
    UnblockUser,
    MuteUser,
    BanUser,
    UnbanUser,
    KickUser,
  };
};

export default useUserOptions;
