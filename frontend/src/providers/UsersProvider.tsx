import { UsersContext } from "@/context/Contexts";
import { useEffect, useState } from "react";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useContext } from "react";
import { GlobalContext } from "@/context/Contexts";
import { NotifyServer } from "../../utils/eventEmitter";
import useEventHandler from "@/hooks/useEventHandler";

interface UsersProviderProps {
  children: React.ReactNode;
}
const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [Users, setUsers] = useState<User[]>([]);

  const [activePeer, setActivePeer] = useState<User | null>(null);
  const [friendsList, setFriendsList] = useState<User[]>([]);
  const [chatNotifications, setChatNotifications] = useState<boolean>(false);
  const [inviteNotifications, setInviteNotifications] =
    useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<string>("");
  
  const allUsersClient = new apiClient("/users");
  const { socket } = useContext(GlobalContext);
  const listen = useEventHandler(socket);
  const friendsListClient = new apiClient("/users/friends");
  const [friendsConversations, setFriendsConversations] = useState<User[]>([]);

  useQuery("friends", {
    queryFn: () => friendsListClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      setFriendsList!(data.friends);
    },
    onError: (err) => {
      console.log(err);
    },
  });
 

  useQuery("users", {
    queryFn: () => allUsersClient.getData().then((res) => res.data),
    onSuccess: (data: User[]) => {
      setUsers(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (socket)
    {

    socket!.on("checkNotification", (message: checkNotification) => {
        setChatNotifications!(message.data.chat);
        setInviteNotifications!(message.data.invites);
        console.log("notifications");
        console.log(message);
      });
    }
  }, [socket]);

  return (
    <UsersContext.Provider
      value={{
        Users,
        friendsList,
        activePeer,
        setActivePeer,
        friendsConversations,
        setFriendsConversations,
        chatNotifications,
        setChatNotifications,
        inviteNotifications,
        setInviteNotifications,
        userStatus,
        setUserStatus,

      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
