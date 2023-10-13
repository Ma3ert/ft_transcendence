// import {PRIVATE,CHANNEL} from './constants'
type Section =
  | "lobby"
  | "chat"
  | "settings"
  | "achievements"
  | "notifications"
  | "friends";
type FriendsSection = "friends" | "requests" | "channels";
type AchievementsSection = "achievements" | "leaderboard";
type SettingsSection = "userSettings" | "passwordSettings";
type ChatType = boolean;
type ModalType = "regular" | "confirmation" ;

type EventName =
  "userLoggedIn"
| "userLoggedOut"
| "userIsActive"
| "checkStatus"
| "userIsNotActive"
| "DM"
| "CM"
| "readChatNotification"

type checkStatus = {
  userid?: number;
};

type ServerNotificationMessage =
  | checkStatus
  | checkChatNotification
  | ReadChatNotification;

type DirectMessage = {
  senderId: string,
  receiverId: string,
  content: string,
  game?: boolean,
};

type ChannelMessage = {
  userId:string,
  channelId:string,
  content:string,
};

// type UsersResponse = {}
// type ChannelsResponse = {}
// typesResponse = {}
// type FriendsResponse = {}
// type responseData = UsersResponse | ChannelsResponse |sResponse | FriendsResponse

type responseData = any;
type Tab = {
  action: () => void;
  value: JSX.Element;
};

type User = {
  avatar: string;
  username: string;
  id: string;
  email?: string;
  status?: string;
  created_at?: string;
  twoFactor?: boolean;
  twoFactorPin?: string | null;
  activated?: boolean;
  pinValidated?: boolean;
  twoFactorRetry?: number;
  friendList?: User[];
};

type meResponse = {
  status: string;
  data: User;
};

type UsersResponse = User[];

type ChannelMessage = {
  from: number;
  channelid: number;
  message: string;
};

type Channel = {
  name: string;
  members: number;
  admin: User;
  avatar?: string;
  createdAt?: string;
  id?: string;
  type?: string;
};

type friendAction = {
  actionName: string;
  modal: boolean;
  important: boolean;
};

interface AppNavigationContext {
  currentSection?: Section;
  getCurrentSectionType?: () => Section;
  setCurrentSection?: (value: Section) => void;
  sections?: Map<Section, JSX.Element>;
  friendsSection?: FriendsSection;
  setFriendsSection?: (value: FriendsSection) => void;
  achievementsSection?: AchievementsSection;
  setAchievementsSection?: (value: AchievementsSection) => void;
  settingsSection?: SettingsSection;
  setSettingsSection?: (value: SettingsSection) => void;
}

interface ChatContext {
  chatType?: ChatType;
  setCurrentChat?: React.Dispatch<React.SetStateAction<ChatType>>;
  setActiveChannel?: (value: Channel) => void;
  activeChannel?: Channel;
  Friends?: User[];
  Channels?: Channel[];
  socket?: Socket;
  directMessages?: DirectMessage[];
  setDirectMessages?: (value: DirectMessage[]) => void;
  joinGameStatus?: boolean;
  setJoinGameStatus?: (value: boolean) => void;
  GameEnvitation?: GameEnvitation | null;
  setGameEnvitation?: React.Dispatch<
    React.SetStateAction<GameEnvitation | null>
  >;
  chatNotification?: boolean;
  setChatNotification?: React.Dispatch<React.SetStateAction<boolean>>;
  requestNotification?: boolean;
  setRequestNotification?: React.Dispatch<React.SetStateAction<boolean>>;
  privateConversations?: string[];
  channelConversations?: string[];
  setPrivateConversations?: React.Dispatch<React.SetStateAction<string[]>>;
  setChannelConversations?: React.Dispatch<React.SetStateAction<string[]>>;
  dmConversations?:User[]
  setDmConversations?:React.Dispatch<React.SetStateAction<User[]>>
}

interface ModalWrapperProps {
  ModalType: ModalType;
  children?: React.ReactNode;
  actionDescription?: string;
}

interface ModalRenderer {
  ModalType: ModalType;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface RegularModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  variant?: string
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  actionDescription: string;
  action?: () => void;
}
interface ModalContext {
  RegularModalWrapper?: React.FC<RegularModalProps>;
  ConfirmationModalWrapper?: React.FC<ConfirmationModalProps>;
}

interface MenuContext {}

type QueryOptions = {
  onSuccess?: (data: responseData) => void;
  onError?: (error: any) => void;
};

type QueryArgs = {
  queryKey: string;
  queryFunction: () => void;
  options?: QueryOptions;
};

type MutationOptions = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type MutationArgs = {
  mutationKey: string;
  mutationFunction: () => Promise<any>;
  options?: MutationOptions;
};

type GlobalContext = {
  socket?: Socket | null;
  setSocket?: React.Dispatch<React.SetStateAction<Socket | null>>;
  authenticated?: boolean;
  setAuthenticated?: (value: boolean) => void;
};

type UsersContext = {
  Users?: User[];
  setUsers?: React.Dispatch<React.SetStateAction<User[]>>;
  loggedInUser?: User;
  setLoggedInUser?: React.Dispatch<React.SetStateAction<User>>;
  friendsList?: User[];
  setFriendsList?: React.Dispatch<React.SetStateAction<User[]>>;
  activePeer?: User | null;
  setActivePeer?: React.Dispatch<React.SetStateAction<User | null>>;
  RecievedFriendRequests?: Envite[];
  SentFriendRequests?: Envite[];
  friendsConversations?: User[];
  setFriendsConversations?: React.Dispatch<React.SetStateAction<User[]>>;
  
};
// Chat Events Types

type GameEnvitation = {
  from: string;
  to: string;
};

type ReadChatNotification = {
  channel?: boolean;
  id?: string;
};

type CheckChatNotification = {
  directMessageNotifications: number[];
  channelNotifications: number[];
};

type EventMessage = ServerNotification | DirectMessage;

type userStatus = "online" | "offline" | "blocked" | "BlockingYou";

type notificationType = "request" | "activeChat" | "unactiveChat";

type CheckNotificationMessage = {
  requestNotifications: boolean;
  chatNotifications: boolean;
};

type EventHandler = (data: EventMessage) => void;

type UserChannel = {
  channelid?: string;
  userid?: string;
  password?: string;
};

type ChannelsContext = {
  Channels?: Channel[];
  setChannels?: React.Dispatch<React.SetStateAction<Channel[]>>;
  activeChannel?: Channel | null;
  setActiveChannel?: React.Dispatch<React.SetStateAction<Channel|null>>;
  channelEnvites?: ChannelEnvite[];
};


type MenuOption = {
  description: string;
  type: 'critical' | 'normal';
  modal?: boolean;
  channelSettings?: boolean;
}

type Envite ={
  id: string,
  inviteUserId: string,
  inviteOwnerId: string,
  createdAt: string
}

type ChannelEnvite = {
  created_at: string,
  id:string,
  reciever: string,
  sender: string,
  channel:Channel
}

type GlobalEnvite = {
  isChannelEnvite: boolean,
  enviteId: string,
  createdAt: string,
  senderId: string,
  receiverId: string,
  channel?: Channel,
}

type Member = {
  user:string
  role:string
  banned:boolean
  mutted:boolean
}

type UserType = "FRIEND" | "USER" | "OWNER" | "MEMBER" | "ADMIN"  | string


type ModalWrapperContext = {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

type CmContext = {
  messages?: ChannelMessage[];
}

type DmContext = {
  messages?: DirectMessage[];
}

type MembersContext = {
  members?: Member[];
  loggedInUserRole?: UserType;
  setMembers?: React.Dispatch<React.SetStateAction<Member[]>>;
}