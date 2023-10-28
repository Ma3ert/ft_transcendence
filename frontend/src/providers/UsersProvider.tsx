import { UsersContext } from "@/context/Contexts";
import { useEffect, useState } from "react";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useContext } from "react";
import { GlobalContext } from "@/context/Contexts";
import { NotifyServer } from "../../utils/eventEmitter";
import useEventHandler from "@/hooks/useEventHandler";
import { useDisclosure } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

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
  const allUsersClient = new apiClient("/users");
  const { socket } = useContext(GlobalContext);
  const listen = useEventHandler(socket);
  const friendsListClient = new apiClient("/users/friends");
  const [friendsConversations, setFriendsConversations] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameInviteSender, setGameInviteSender] = useState<string>("");
  const {currentUser} = useAuth ()
  const router = useRouter ()

  
  useQuery("friends", {
    queryFn: () => friendsListClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      setFriendsList!(data.friends);
    },
    onError: (err) => {
      ////console.log(err);
    },
  });

  useQuery("users", {
    queryFn: () => allUsersClient.getData().then((res) => res.data),
    onSuccess: (data: User[]) => {
      setUsers(data);
    },
    onError: (err) => {
      ////console.log(err);
    },
  });

  useEffect(() => {
    if (currentUser === undefined)
    router.push ("/")
    if (socket) {
      socket!.on("checkNotification", (message: checkNotification) => {
        console.table (message)
        setChatNotifications!(message.data.chat);
        setInviteNotifications!(message.data.invites);
      });
      socket!.on("GameInvite", (response: any) => {
        setGameInviteSender!(response.senderId);
        onOpen!();
      });
    }
  }, [socket, chatNotifications, inviteNotifications]);

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
        onClose,
        onOpen,
        isOpen,
        gameInviteSender,
        setGameInviteSender,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
