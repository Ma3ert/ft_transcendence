import apiClient from "@/services/requestProcessor";
import { useMutation } from "react-query";
const useChannelSettingsManager = () => {
  const upgradeUserClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/upgrade/${user.userid}/`);
  const sentChannelEnviteClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/sent/${user.userid}`);
  const acceptChannelEnviteClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/accept`);
  const declineChannelEnviteClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/decline`);
  const muteUserClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/mute/${user.userid}`);
  const banUserClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/ban/${user.userid}`);
  const unbanUserClient = (user: UserChannel) =>
    new apiClient(`/chat/channels/${user.channelid}/unban/${user.userid}`);


  const sentChannelEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      sentChannelEnviteClient(user).postData(null),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  const acceptChannelEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      acceptChannelEnviteClient(user).postData(null),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });
  const declineChannelEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      declineChannelEnviteClient(user).deleteData(),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const acceptProtectedEnviteMutation = useMutation({
    mutationFn: (user: UserChannel) =>
      acceptChannelEnviteClient(user).postData({ password: user!.password }),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const muteUserMutation = useMutation({
    mutationFn: (user: UserChannel) => muteUserClient(user).postData(null),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const banUserMutation = useMutation({
    mutationFn: (user: UserChannel) => banUserClient(user).postData(null),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const unbanUserMutation = useMutation({
    mutationFn: (user: UserChannel) => unbanUserClient(user).deleteData(),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  function sentChannelEnvite(user: UserChannel) {
    sentChannelEnviteMutation.mutate(user);
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

  function muteUser(user: UserChannel) {
    muteUserMutation.mutate(user);
  }
  function banUser(user: UserChannel) {
    banUserMutation.mutate(user);
  }
  function unbanUser(user: UserChannel) {
    unbanUserMutation.mutate(user);
  }

  return {
    sentChannelEnvite,
    acceptChannelEnvite,
    declineChannelEnvite,
    acceptProtectedEnvite,
    muteUser,
    banUser,
    unbanUser,
  };
};

export default useChannelSettingsManager;
