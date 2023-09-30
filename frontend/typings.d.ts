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
type ModalType = "regular" | "confirmation" | "alert" | "prompt" | "custom";
type EventName =
  | "userLoggedIn"
  | "userIsActive"
  | "userisNotActive"
  | "checkNotification"
  | "checkStatus"
  | "directMessage"
  | "channelMessage"
  | "checkChatNotification"
  | "serverSayHello"
  | "readChatNotification";

type checkStatus = {
  userid?: number;
};

type ServerNotificationMessage =
  | checkStatus
  | checkChatNotification
  | ReadChatNotification;

type DirectMessage = {
  to?: string;
  from?: string;
  username?: string;
  message?: string;
  socketid?: string;
  game?: boolean;
};

type ChannelMessage = {
  from?: string;
  channelid?: string;
  message?: string;
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
  isPrivate: boalean;
  isProtected?: boolean;
  name: string;
  members: User[];
  admin: User;
  membersCount: number;
  imageUrl?: string;
  createdAt?: string;
  messages?: ChannelMessage[];
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
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  actionDescription: string;
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
};
