import {
  AppNavigationContext,
  UsersContext,
  ChatContext,
} from "@/context/Contexts";
import { useContext } from "react";
import useUserOptions from "./useOptions";
import UserProfileModal from "@/components/ChatComponents/UserProfileModal";
import InviteToChannels from "@/components/ChatComponents/InviteToChannels";
import { CHANNEL } from "../../contstants";

const useOptionsManager = (loggedIndUser:User, user:User, friendsList:User[], currentSection:Section , chatType:ChatType, userIsBlocked:boolean) => {
  

  const { EnviteUser, BlockUser } = useUserOptions();
  const actions = new Map([["Send friend request", () => EnviteUser(user)], ["Block", () => BlockUser(user)]]);
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
  function isUserNotFriend(user: User, userRole?: string, loggedInUserRole?: string) {
    if (friendsList!.find((friend) => friend.id === user.id)) return false;
    return true;
  }

  function isUserEnvitableToGame(user: User, userRole?: string, loggedInUserRole?: string) {
    if (!userIsBlocked && isUserNotFriend(user)) return false;
    return true;
  }

  function isUserEnvitableToChannel(user: User, userRole?: string, loggedInUserRole?: string) {
    if (!userIsBlocked && isUserNotFriend(user)) return false;
    return true;
  }

  function checkMakePartyAdmin(user:User, userRole?: string, loggedInUserRole?: string) {
    // check if user is banned
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return true
    }
    // if (
    //   currentSection == "chat" &&
    //   chatType == CHANNEL &&
    //   loggedInUserRole == "OWNER" &&
    //   userRole == "MEMBER"
    // )
    //   return true;
    return false;
  }
  function checkRemovePartyAdmin(user:User,  userRole?: string, loggedInUserRole?: string) {
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return true
    }
    /// check if user is banned
    // if (
    //   currentSection == "chat" &&
    //   chatType == CHANNEL &&
    //   loggedInUserRole == "OWNER" &&
    //   userRole == "ADMIN"
    // )
    //   return true;
    return false;
  }

  function checkBanFromChannel(user:User,userRole?: string, loggedInUserRole?: string) {
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return true
    }
    // check if user is banned == false
    // if (
    //   currentSection == "chat" &&
    //   chatType == CHANNEL &&
    //   (((loggedInUserRole == "OWNER" || loggedInUserRole == "ADMIN") &&
    //     userRole == "MEMBER") ||
    //     (loggedInUserRole == "OWNER" && userRole == "ADMIN"))
    // )
    //   return true;
    return false;
  }

  function checkUnbanFromChannel(user:User, userRole?: string, loggedInUserRole?: string) {
     if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return  true
    }
    // check if user is banned == true
    // if (
    //   currentSection == "chat" &&
    //   chatType == CHANNEL &&
    //   (((loggedInUserRole == "OWNER" || loggedInUserRole == "ADMIN") &&
    //     userRole == "MEMBER") ||
    //     (loggedInUserRole == "OWNER" && userRole == "ADMIN"))
    // )
    //   return true;
    return false;
  }

  function checkMute(user:User, userRole?: string, loggedInUserRole?: string) {
    // check if user is muted == false
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return true
    }
    // if (
    //   currentSection == "chat" &&
    //   chatType == CHANNEL &&
    //   (((loggedInUserRole == "OWNER" || loggedInUserRole == "ADMIN") &&
    //     userRole == "MEMBER") ||
    //     (loggedInUserRole == "OWNER" && userRole == "ADMIN"))
    // )
    //   return true;
    return false;
  }

  function checkUnmute(user:User, userRole?: string, loggedInUserRole?: string) {
    // check if user is muted == true
    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return true
    }
      
      // (((loggedInUserRole == "OWNER" || loggedInUserRole == "ADMIN") &&
      //   userRole == "MEMBER") ||
      //   (loggedInUserRole == "OWNER" && userRole == "ADMIN"))
    
      // return true;
    return false;
  }

  function checkKickFromChannel(user:User, userRole?: string, loggedInUserRole?: string) {

    if ( currentSection == "chat" &&
    chatType == CHANNEL)
    {
      return true;
    }
    // if (
    //   currentSection == "chat" &&
    //   chatType == CHANNEL &&
    //   (((loggedInUserRole == "OWNER" || loggedInUserRole == "ADMIN") &&
    //     userRole == "MEMBER") ||
    //     (loggedInUserRole == "OWNER" && userRole == "ADMIN"))
    // )
    //   return true;
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
        return isUserNotFriend;
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