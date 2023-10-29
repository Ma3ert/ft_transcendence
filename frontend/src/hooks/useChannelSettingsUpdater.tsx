import apiClient from "@/services/requestProcessor";
import { useMutation } from "react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
const useChannelSettingsUpdater = (channel: Channel) => {
  const upgrageUserClient = (user: UserChannel) =>
    `chat/channels/${user.channelid}/upgrade/${user.userid}/`;
  const downgradeUserClient = (user: UserChannel) =>
    `chat/channels/${user.channelid}/downgrade/${user.userid}/`;
  const setChannelPasswordClient = (channel: Channel) =>
    `chat/channels/${channel.id}/set-password/`;
  const removeChannelPasswordClient = (channel: Channel) =>
    `chat/channels/${channel.id}/remove-password/`;
  const changeChannelPasswordClient = (channel: Channel) =>
    `chat/channels/${channel.id}/change-password/`;
  const changeChannelNameClient = (channel: Channel) =>
    `chat/channels/${channel.id}/change-name/`;
  const visibilityClient = (channelId: string) =>
    `chat/channels/${channelId}/change-visibility`;
  const toast = useToast();
  const queryClient = useQueryClient();

  const upgradeUserMutation = useMutation({
    mutationFn: async (user: UserChannel) =>
      await axios
        .patch(
          `http://e1r9p3.1337.ma:3000/${upgrageUserClient(user)}`,
          {},
          { withCredentials: true }
        )
        .then((response) => response),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channelMembers", channel.id]);
      toast({
        title: "User upgraded.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(data);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to upgrade user.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(error);
    },
  });

  const downgradeUserMutation = useMutation({
    mutationFn: async (user: UserChannel) =>
      await axios
        .patch(
          `http://e1r9p3.1337.ma:3000/${downgradeUserClient(user)}`,
          {},
          { withCredentials: true }
        )
        .then((response) => response),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channelMembers", channel!.id]);
      toast({
        title: "User downgraded.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(data);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to downgrade user.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(error);
    },
  });

  const setChannelPasswordMutation = useMutation({
    mutationFn: async (password: string) =>
      await axios
        .patch(
          `http://e1r9p3.1337.ma:3000/${setChannelPasswordClient(channel)}`,
          {
            password: password,
          },
          {
            withCredentials: true, // Include credentials (cookies) in the request
          }
        )
        .then((response) => response),
    onSuccess: (data) => {
      queryClient.invalidateQueries("channels");
      queryClient.invalidateQueries(["channel", channel.id]);
      toast({
        title: "Channel password set.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(data);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to set channel password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(error);
    },
  });

  const changeChannelNameMutation = useMutation({
    mutationFn: async (channelName: string) =>
      await axios
        .patch(
          `http://e1r9p3.1337.ma:3000/${changeChannelNameClient(channel)}`,
          {
            name: channelName,
          },
          {
            withCredentials: true, // Include credentials (cookies) in the request
          }
        )
        .then((response) => response),
    onSuccess: (data) => {
      queryClient.invalidateQueries("channels");
      queryClient.invalidateQueries(["channel", channel.id]);
      toast({
        title: "Channel name changed.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(data);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to change channel name.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(error);
    },
  });

  const removeChannelPasswordMutation = useMutation({
    mutationFn: async () =>
      await axios.patch(
        `http://e1r9p3.1337.ma:3000/${removeChannelPasswordClient(channel)}`,
        {},
        {
          withCredentials: true,
        }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries("channels");
      queryClient.invalidateQueries(["channel", channel.id]);
      toast({
        title: "Channel password removed.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(data);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to remove channel password.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(error);
    },
  });

  interface PasswordObject {
    currentPassword: string;
    newPassword: string;
  }
  const changeChannelPasswordMutation = useMutation({
    mutationFn: async (req: PasswordObject) =>
      await axios
        .patch(
          `http://e1r9p3.1337.ma:3000/${changeChannelPasswordClient(channel)}`,
          {
            currentPassword: req.currentPassword,
            newPassword: req.newPassword,
          },
          {
            withCredentials: true, // Include credentials (cookies) in the request
          }
        )
        .then((response) => response),
    onSuccess: (data) => {
      toast({
        title: "Channel password changed.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(data);
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to change password",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      ////console.log(error);
    },
  });

  interface ChannelType {
    channelId: string;
    type: string;
  }
  const changeVisibilityMutation = useMutation({
    mutationFn: async (req: ChannelType) =>
      await axios.patch(
        `http://e1r9p3.1337.ma:3000/${visibilityClient(req.channelId)}`,
        { type: req.type },
        {
          withCredentials: true,
        }
      ),
    onSuccess: (data) => {
      queryClient.invalidateQueries("channels");
      toast({
        title: "Channel visibility changed.",
        description: "You can now share it with your friends.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Failed to change channel visibility.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
  function upgradeUser(user: UserChannel) {
    upgradeUserMutation.mutate(user);
  }
  function downgradeUser(user: UserChannel) {
    downgradeUserMutation.mutate(user);
  }
  function setChannelPassword(password: string) {
    setChannelPasswordMutation.mutate(password);
  }
  function removeChannelPassword() {
    removeChannelPasswordMutation.mutate();
  }
  function changeChannelPassword(current: string, newPassword: string) {
    const pass: PasswordObject = {
      currentPassword: current,
      newPassword: newPassword,
    };
    changeChannelPasswordMutation.mutate(pass);
  }
  function changeChannelName(channelName: string) {
    changeChannelNameMutation.mutate(channelName);
  }
  function changeVisibility(channelId: string, type: string) {
    changeVisibilityMutation.mutate({ channelId, type });
  }
  return {
    upgradeUser,
    downgradeUser,
    setChannelPassword,
    removeChannelPassword,
    changeChannelPassword,
    changeChannelName,
    changeVisibility,
  };
};

export default useChannelSettingsUpdater;
