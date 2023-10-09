import {
  AppNavigationContext,
  UsersContext,
  ChatContext,
  ChannelsContext,
} from "@/context/Contexts";
import { useContext } from "react";
import useUserOptions from "./useOptions";
import UserProfileModal from "@/components/ChatComponents/UserProfileModal";
import InviteToChannels from "@/components/ChatComponents/InviteToChannels";
import { CHANNEL } from "../../contstants";
import useUserStatus from "./useUserStatus";
import useChannelSettingsUpdater from "./useChannelSettingsUpdater";

const useOptionsManager = (loggedIndUser:User, user:User, friendsList:User[], currentSection:Section , chatType:ChatType, userIsBlocked:boolean) => {
  

  const { EnviteUser, BlockUser, UnblockUser, BanUser } = useUserOptions();
  const {activeChannel} = useContext(ChannelsContext);
  const {upgradeUser, downgradeUser} = useChannelSettingsUpdater(activeChannel!);
  const actions = new Map([["Send friend request", () => EnviteUser(user)], ["Block", () => BlockUser(user)], ["Unblock", () => UnblockUser(user)],
  [
    "Ban from channel",
    () => BanUser ({userid:user.id, channelid:activeChannel!.id})
  ],
  [
    "Make party admin",
    () => upgradeUser({userid:user.id, channelid:activeChannel!.id})
  ],
  [ 
    
    "Remove party admin",
    () => downgradeUser({userid:user.id, channelid:activeChannel!.id})]
  ]);
  const modals = new Map([
    [
      "See Profile",
      (user: User) => {
        return <UserProfileModal user={user!} />;
      },
    ],
    [
      "Invite to join channel",
      (user: User) => {
        return <InviteToChannels user={user!} />;
      },
    ],
  ]);
  function isUserFriend(user: User) {
    if (userIsBlocked)
      return false;
    if (friendsList!.find((friend) => friend.id === user.id)) return true;
    return false;
  }

  function isUserEnvitableToGame(user: User) {
    if (userIsBlocked) return false;
    if (isUserFriend(user)) return true;
    return false;
  }

  function isUserEnvitableToChannel(user: User) {
    if (userIsBlocked) return false;
    if (isUserFriend(user)) return true;
    return false;
  }

  function checkMakePartyAdmin(user:User, userRole?: string, loggedInUserRole?: string) {
    // check if user is banned
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if (userRole == "MEMBER" && loggedInUserRole == "OWNER") return true;
      return false;
    }
  
    return false;
  }
  function checkRemovePartyAdmin(user:User,  userRole?: string, loggedInUserRole?: string) {
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if (userRole == "ADMIN" && loggedInUserRole == "OWNER") return true;
      return false
    }
  
    return false;
  }

  function checkBanFromChannel(user:User,member:Member, loggedInUserRole?: string) {
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if (member.banned == false && (member.role == "MEMBER" || member.role == 'ADMIN') && loggedInUserRole == "OWNER") return true;
      else if (member.role == "MEMBER" && loggedInUserRole == "ADMIN") return true;
      return false
    }
   
    return false;
  }

  function checkUnbanFromChannel(user:User,loggedInUserRole:string, member:Member) {
     if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if (member.banned && (loggedInUserRole == "OWNER" || loggedInUserRole == 'ADMIN') && member.banned)
        return  true
      return false
    }
    
    return false;
  }

  function checkMute(user:User,loggedInUserRole:string, member:Member) {
    // check if user is muted == false
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if ((member.role == "MEMBER" || member.role == 'ADMIN') && loggedInUserRole == "OWNER") return true;
      else if (member.role == "MEMBER" && loggedInUserRole == "ADMIN") return true;
      return false
    }
  
    return false;
  }

  function checkUnmute(user:User,loggedInUserRole:string, member:Member) {
    // check if user is muted == true
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if ((loggedInUserRole == "OWNER" || loggedInUserRole == 'ADMIN') && member.mutted)
        return  true
      return false
    }
      
    
    return false;
  }

  function checkKickFromChannel(user:User, userRole?: string,  loggedInUserRole?: string) {

    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      if ((userRole == "MEMBER" || userRole == 'ADMIN') && loggedInUserRole == "OWNER") return true;
      else if (userRole == "MEMBER" && loggedInUserRole == "ADMIN") return true;
      return false
    }
   
    return false;
  }

  function checkBlock(user:User, userRole?: string, loggedInUserRole?: string) {
    if (userIsBlocked) return false;
    return true;
  }

  function checkUnblock(user:User, userRole?: string, loggedInUserRole?: string) {
    if (userIsBlocked) return true;
    return false;
  }

  function getChecker(option: string) {
    switch (option) {
      case "Send friend request":
        return ()=>(userIsBlocked?false:true);
      case "Invite to join game":
        return isUserEnvitableToGame;
      case "Invite to join channel":
        return isUserEnvitableToChannel;
      case "See Profile":
        return () => true;
      case "Make party admin":
        return checkMakePartyAdmin;
      case "Remove party admin":
        return checkRemovePartyAdmin;
      case "Ban from channel":
        return checkBanFromChannel;
      case "Unban":
        return checkUnbanFromChannel;
      case "Mute":
        return checkMute;
      case "Unmute":
        return checkUnmute;
      case "Kick from channel":
        return checkKickFromChannel;
      case "Block":
        return checkBlock;
      case "Unblock":
        return checkUnblock;
      default:
        return () => false;
    }
  }

  return {getChecker, actions, modals}
};


export default useOptionsManager;