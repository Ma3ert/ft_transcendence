import { useContext } from "react";
import { ChannelsContext } from "../context/Contexts";
import useUserOptions from "./useOptions";
import useChannelSettingsUpdater from "./useChannelSettingsUpdater";
const useActions = (user: User) => {
  const { activeChannel } = useContext(ChannelsContext);
  const {
    EnviteUser,
    BlockUser,
    UnblockUser,
    BanUser,
    MuteUser,
    UnbanUser,
    KickUser,
  } = useUserOptions(activeChannel!);
  const { upgradeUser, downgradeUser } = useChannelSettingsUpdater(
    activeChannel!
  );
  const actions = new Map([
    ["Send friend request", () => EnviteUser(user)],
    ["Block", () => BlockUser(user)],
    ["Unblock", () => UnblockUser(user)],
    [
      "Ban from channel",
      () => BanUser({ userid: user.id, channelid: activeChannel!.id }),
    ],
    [
      "Make party admin",
      () => upgradeUser({ userid: user.id, channelid: activeChannel!.id }),
    ],
    [
      "Remove party admin",
      () => downgradeUser({ userid: user.id, channelid: activeChannel!.id }),
    ],
    ["Mute", () => MuteUser({ userid: user.id, channelid: activeChannel!.id })],
    [
      "Unmute",
      () => UnbanUser({ userid: user.id, channelid: activeChannel!.id }),
    ],
    [
      "Kick from channel",
      () => KickUser({ userid: user.id, channelid: activeChannel!.id }),
    ],
    [
      "Unban",
      () => UnbanUser({ userid: user.id, channelid: activeChannel!.id }),
    ],
  ]);
  return { actions };
};

export default useActions;
