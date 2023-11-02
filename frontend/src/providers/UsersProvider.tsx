import { ChatContext, UsersContext } from "@/context/Contexts";
import { useEffect, useState } from "react";
import apiClient from "@/services/requestProcessor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { GlobalContext } from "@/context/Contexts";
import { NotifyServer } from "../../utils/eventEmitter";
import useEventHandler from "@/hooks/useEventHandler";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import  gameSocket from "@/components/GameComponents/socket";


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
  const { socket: chatSocket } = useContext(GlobalContext);
  const listen = useEventHandler(chatSocket);
  const friendsListClient = new apiClient("/users/friends");
  const [friendsConversations, setFriendsConversations] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gameInviteSender, setGameInviteSender] = useState<string>("");
  const { currentUser } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast ()
  const [inviteStatus, setInviteStatus] = useState <boolean> (false);
  const [inviteTogameId, setInviteTogameId] = useState <string> ("");

  useQuery(["friends"], {
    queryFn: () => friendsListClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      setFriendsList!(data.friends);
    },
    onError: (err) => {
      ////console.log(err);
    },
  });

  useQuery(["users"], {
    queryFn: () => allUsersClient.getData().then((res) => res.data),
    onSuccess: (data: User[]) => {
      setUsers(data);
    },
    onError: (err) => {
      ////console.log(err);
    },
  });

  useEffect(() => {
    if (currentUser === undefined) router.push("/");
    if (chatSocket) {
      chatSocket!.on("checkNotification", async (message: checkNotification) => {
        console.table(message);
        setChatNotifications!(message.data.chat);
        setInviteNotifications!(message.data.invites);
        await queryClient.refetchQueries({ stale: true });
      });
    }

    gameSocket?.on("newInvite", (data: any) => {
      setGameInviteSender!(data.user.id);
      setInviteTogameId (data.invite)
      onOpen!();
      setInviteStatus (true);
    });


    gameSocket?.on("inviteSent", (data: any) => {
      toast.isActive("invite") && toast ({
          title:'Success',
          id: "invite",
          description:'Invite sent successfully',
      })

    gameSocket?.on ("userAcceptedInvite", () => {
      !toast.isActive("set") &&
      toast({
        id: "set",
        title: "Setting up the game...",
        status: "info",
      });
      router.push("/Game");
    })

      setInviteStatus (true);
      // setGameInviteSender!(response.senderId);
      // onOpen!();
    });
  }, [chatSocket, chatNotifications, inviteNotifications]);

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
        inviteStatus,
        setInviteStatus,
        inviteTogameId ,
        setInviteTogameId
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
