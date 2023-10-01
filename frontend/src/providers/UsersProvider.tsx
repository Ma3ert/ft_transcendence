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
  const [RecievedFriendRequests, setRecievedFriendRequests] = useState<Envite[]>([]);
  const [SentFriendRequests, setSentFriendRequests] = useState<Envite[]>([]);
  const recievedClient = new apiClient("/invites/received");
  const sentClient = new apiClient("/invites/sent");

  useQuery("recievedEnvites", {
    queryFn: async () => recievedClient.getData().then((data) => data.data),
    onSuccess: (response: any) => {
      console.log(`recieved envites`);
      console.table (response)
      setRecievedFriendRequests(response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useQuery("sentEnvites", {
    queryFn: async () => sentClient.getData().then((data) => data.data),
    onSuccess: (response: any) => {
      console.log(`sent envites : ${response}`);
      console.table (response)
      setSentFriendRequests(response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [loggedInUser, setLoggedInUser] = useState<User>({
    id: "0066312b-9ce5-4eb4-a4ce-8fcf467f7e9d",
    username: "ochoumou",
    email: "ochoumou@student.1337.ma",
    avatar:
      "https://cdn.intra.42.fr/users/3b86420766f725922024d5ace6c6e5be/ochoumou.jpg",
    twoFactorRetry: 0,
    twoFactor: false,
    twoFactorPin: null,
    activated: false,
    pinValidated: false,
    status: "ONLINE",
    created_at: "2023-09-26T17:41:53.943Z",
    friendList: [],
  });
  const allUsersClient = new apiClient("/users");
  const meClient = new apiClient("/users/me");
  const friendsListClient = new apiClient("/users/friends");
  const { socket } = useContext(GlobalContext);
  const listen = useEventHandler(socket);

  useQuery("me", {
    queryFn: (async) => meClient.getData().then((res: any) => res.data),
    onSuccess: (response: meResponse) => {
      console.table(response);
      setLoggedInUser!(response.data);
    },
    onError: (error) => {
      console.log(error);
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

  useQuery("friends", {
    queryFn: () => friendsListClient.getData().then((res) => res.data),
    onSuccess: (data: User[]) => {
      setFriendsList(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  useEffect(() => {
    console.log(`user provider mounted socket id : ${socket?.id}`);
    NotifyServer(socket!, "userLoggedIn", loggedInUser!);
    listen("checkNotification", (msg: CheckNotificationMessage) => {
      console.log(msg);
    });
  }, [Users, loggedInUser]);

  return (
    <UsersContext.Provider
      value={{ Users, loggedInUser, friendsList, activePeer, setActivePeer , RecievedFriendRequests, SentFriendRequests}}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
