// import {PRIVATE,CHANNEL} from './constants'
type Section =
  | "lobby"
  | "chat"
  | "settings"
  | "achievements"
  | "stats"
  | "friends";
type FriendsSection = "friends" | "requests" | "channels";
type AchievementsSection = "achievements" | "leaderboard";
type SettingsSection = "userSettings" | "userProfile";
type ChatType = boolean;
type ModalType = "regular" | "confirmation";

type EventName =
  | "userLoggedIn"
  | "userLoggedOut"
  | "userIsActive"
  | "checkStatus"
  | "userIsNotActive"
  | "DM"
  | "CM"
  | "readChatNotification";

type checkStatus = {
  userid?: number;
};

type ServerNotificationMessage =
  | checkStatus
  | checkChatNotification
  | ReadChatNotification;

type DirectMessage = {
  senderId: string;
  receiverId: string;
  message: string;
  game?: boolean;
};

type ChannelMessage = {
  senderId: string;
  channelId: string;
  message: string;
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
  games?: any;
  avatar: string;
  username: string;
  id: string;
  email?: string;
  status?: string;
  created_at?: string;
  twoFactor?: boolean;
  twoFactorStatus?: boolean
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
  statsSection?: StatsSection;
  setStatsSection?: (value: StatsSection) => void;
}

type UserStatus = {
  userId?: string;
  status?: string;
}

type UserStatusContext = {
  userStatus?: UserStatus | null;
  setUserStatus?: React.Dispatch<React.SetStateAction<UserStatus | null>>;
};
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
  dmConversations?: User[];
  setDmConversations?: React.Dispatch<React.SetStateAction<User[]>>;
  DmNotifications?: string[];
  setDmNotifications?: React.Dispatch<React.SetStateAction<string[]>>;
  CmNotifications?: string[];
  setCmNotifications?: React.Dispatch<React.SetStateAction<string[]>>;
  gameInviteSender?: string;
  setGameInviteSender?: React.Dispatch<React.SetStateAction<string>>;
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
  variant?: string;
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
  queryKey: string[];
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

type AuthUserContext = {
  currentUser?: any
  updateUser?: () => void
}

type GlobalContext = {
  socket?: Socket | null;
  setSocket?: React.Dispatch<React.SetStateAction<Socket | null>>;
  authenticated?: boolean;
  setAuthenticated?: (value: boolean) => void;
  counter?:number
  setCounter?:React.Dispatch<React.SetStateAction<number>>;
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
  chatNotifications?: boolean;
  inviteNotifications?: boolean;
  setChatNotifications?:React.Dispatch<React.SetStateAction<boolean>>;
  setInviteNotifications?:React.Dispatch<React.SetStateAction<boolean>>;
  userStatus?: UserStatus;
  setUserStatus?:React.Dispatch<React.SetStateAction<UserStatus>>;
  isOpen?:boolean
  onClose?:() => void
  onOpen?: () => void
  gameInviteSender?: string 
  setGameInviteSender?:React.Dispatch<SetStateAction<string>>
  inviteStatus?:boolean
  setInviteStatus?:React.Dispatch<SetStateAction<boolean>>
  inviteTogameId?:string
  setInviteTogameId?:React.Dispatch<SetStateAction<string>>
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
  PublicChannels?: Channel[];
  setPublicChannels?: React.Dispatch<React.SetStateAction<Channel[]>>;
  activeChannel?: Channel | null;
  setActiveChannel?: React.Dispatch<React.SetStateAction<Channel | null>>;
  channelEnvites?: ChannelEnvite[];
};

type MenuOption = {
  description: string;
  type: "critical" | "normal";
  modal?: boolean;
  channelSettings?: boolean;
  modalType?: "largeModal" | "default";
};

type Envite = {
  id: string;
  inviteUserId: string;
  inviteOwnerId: string;
  createdAt: string;
};

type ChannelEnvite = {
  created_at: string;
  id: string;
  receiver: string;
  sender: string;
  channel: Channel;
};

type GlobalEnvite = {
  isChannelEnvite: boolean;
  enviteId: string;
  createdAt: string;
  senderId: string;
  receiverId: string;
  channel?: Channel;
};

type Member = {
  user: string;
  role: string;
  banned: boolean;
  muted: boolean;
};

type UserType = "FRIEND" | "USER" | "OWNER" | "MEMBER" | "ADMIN" | string;

type ModalWrapperContext = {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

type CmContext = {
  messages?: ChannelMessage[];
  setChannelMessages?: React.Dispatch<SetStateAction<ChannelMessage[]>>
};

type DmContext = {
  messages?: DirectMessage[];
  setMessages?: React.Dispatch<SetStateAction<DirectMessage[]>>
};

type MembersContext = {
  members?: Member[];
  loggedInUserRole?: UserType;
  setMembers?: React.Dispatch<React.SetStateAction<Member[]>>;
};

type checkNotification = {
  userId:string
  data:{
    invites: boolean;
    chat: boolean;
  }
};

type ChatNotification = { DM: string[]; CM: string[] };
type checkStatus = {status:string} 
type readChatNotification = {channel:boolean, Id:string}
type StatsSection = 'stats' |  'history' 

type InvitesContext = {
  channelRecieved?:GlobalInvite []
  channelSent?:GlobalInvite []
  friendRecieved?:GlobalInvite []
  friendSent?:GlobalInvite []
}

type UsersChannelsContext = {
  Channels?: Channel[]
  PublicChannels?:Channel[]
}