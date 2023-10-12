// import {PRIVATE,CHANNEL} from './constants'
type Section =
  | "lobby"
  | "chat"
  | "settings"
  | "achievements"
  | "notifications"
  | "friends";
type FriendsSection = "friends" | "requests";
type AchievementsSection = "achievements" | "leaderboard";
type SettingsSection = "userSettings" | "passwordSettings";
type ChatType = boolean;
type ModalType = "regular" | "confirmation" | "alert" | "prompt" | "custom";
type EventName =
  | "userLoggedIn"
  | "userIn"
  | "userOut"
  | "direct_message"
  | "channel_message"
  | "channel_created"
  | "channel_deleted"
  | "channel_updated"
  | "friend_request"
  | "friend_request_accepted"
  | "friend_request_rejected"
  | "friend_request_canceled"
  | "friend_removed"
  | "friend_updated"
  | "user_updated"
  | "user_created"
  | "user_deleted";



type ServerNotificationMessage = {
    username: string;
    userid: number;
    socketid: string;
}

type  DirectMessage = {
    to: number;
    from: number;
    username:string;
    message: string;
    enviteMessage: boolean;
    socketid: string;
}

type ChannelMessage ={
    userid:number
    username:string
    message:string
    channelid:number
    socketid:string
}

type EventMessage = ServerNotification | DirectMessage

// type UsersResponse = {}
// type ChannelsResponse = {}
// type MessagesResponse = {}
// type FriendsResponse = {}
// type responseData = UsersResponse | ChannelsResponse | MessagesResponse | FriendsResponse

type responseData = any;
type Tab = {
  action: () => void;
  value: JSX.Element;
};
type User = {
  imageUrl: string;
  username: string;
  online: boolean;
  level: number;
  id: number;
};

type Message = {
  content: string;
  incoming: boolean;
  time: string;
  Author: User;
  EnviteMessage: boolean;
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
  messages?: Message[];
  id?: number;
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
  setChatType?: (value: ChatType) => void;
  setActivePeer?: (value: User) => void;
  setActiveChannel?: (value: Channel) => void;
  activePeer?: User;
  activeChannel?: Channel;
  Friends?: User[];
  Channels?: Channel[];
  socket?: SocketIOClient.Socket;
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

type AuthUserContext = {
  currentUser?: any
  setCurrentUser?: Dispatch<SetStateAction<null>>
}