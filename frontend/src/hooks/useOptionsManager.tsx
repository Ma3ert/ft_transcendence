import {
  AppNavigationContext,
  UsersContext,
  ChatContext,
  ChannelsContext,
} from "@/context/Contexts";
import { useContext } from "react";
import { CHANNEL, PRIVATE } from "../../contstants";
import useUserStatus from "./useUserStatus";
import { useAuth } from "./useAuth";
import { getUserRole } from "../../utils/helpers";
import { usePathname } from "next/navigation";

const useOptionsManager = (
  user: User,
  Member?: Member,
  MembersList?: Member[]
) => {
  const { friendsList } = useContext(UsersContext);
  const { userIsBlocked } = useUserStatus(user);
  const { currentSection } = useContext(AppNavigationContext);
  const { chatType } = useContext(ChatContext);
  const { currentUser } = useAuth();
  const path = usePathname ();

  const currentUserRole = MembersList!
    ? getUserRole(currentUser!.user!, MembersList!)
    : undefined;


 

  function isUserFriend() {
    if (userIsBlocked) return false;
    if (friendsList &&  friendsList?.length > 0 && friendsList!.find((friend) => friend.id === user.id)) return true;
    return false;
  }

  function isUserEnvitableToGame() {
    if (userIsBlocked) return false;
    if (isUserFriend()) return true;
    return false;
  }

  function isUserEnvitableToChannel() {
    if (userIsBlocked) return false;
    if (isUserFriend()) return true;
    return false;
  }

  function checkMakePartyAdmin() {
    // check if user is banned
    if (Member && Member?.role == "MEMBER" && currentUserRole! == "OWNER")
      return true;
    return false;
  }
  function checkRemovePartyAdmin() {
    if (Member && Member?.role == "ADMIN" && currentUserRole! == "OWNER")
      return true;
    return false;
  }

  function checkBanFromChannel() {
    if (
      Member &&
      Member?.banned == false &&
      (Member?.role == "MEMBER" || Member?.role == "ADMIN") &&
      currentUserRole! == "OWNER"
    )
      return true;
    else if (Member && Member?.role == "MEMBER" && currentUserRole! == "ADMIN")
      return true;
    return false;
  }

  function checkUnbanFromChannel() {
    if (
      Member &&
      Member?.banned &&
      (currentUserRole! == "OWNER" || currentUserRole! == "ADMIN") &&
      Member?.banned
    )
      return true;
    return false;
  }

  function checkMute() {
    // check if user is muted == false

    if (
      
      Member &&
      (Member?.role == "MEMBER" || Member?.role == "ADMIN") &&
      currentUserRole! == "OWNER"
    )
      return true;
    else if (Member && Member?.role == "MEMBER" && currentUserRole! == "ADMIN")
      return true;
    return false;
  }

  function checkUnmute() {
    // check if user is muted == true
    if (
      Member &&
      (currentUserRole! == "OWNER" || currentUserRole! == "ADMIN") &&
      Member?.muted
    )
      return true;
    return false;
  }

  function checkKickFromChannel() {
    if (
      
      (Member?.role == "MEMBER" || Member?.role == "ADMIN") &&
      currentUserRole! == "OWNER"
    )
      return true;
    else if (Member && Member?.role == "MEMBER" && currentUserRole! == "ADMIN")
      return true;
    return false;
  }

  function checkBlock() {
    if (path === '/Chat' && chatType == PRIVATE) return false ;
    if (userIsBlocked) return false;
    return true;
  }

  function checkUnblock() {
    if (userIsBlocked) return true;
    return false;
  }

  function getChecker(option: string) {
    switch (option) {
      case "Send friend request":
        return () => !isUserFriend();
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

  return { getChecker };
};

export default useOptionsManager;
