
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
  | "userIsActive"
  | "userisNotActive"
  | "checkNotification"
  | "checkStatus"
  | "directMessage"
  | "channelMessage"
  | "checkChatNotification"
  |  "serverSayHello"



type ServerNotificationMessage = {
    username: string;
    userid: number;
    socketid: string;
}

type  DirectMessage = {
    to?: number;
    from?: number;
    username?:string;
    message?: string;
    socketid?: string;
    game?: boolean;
}

type ChannelMessage ={
    from:number
    channelid:number
    message:string
    socketid:string
}

type EventMessage = ServerNotification | DirectMessage

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
  imageUrl: string;
  username: string;
  online: boolean;
  level: number;
  id: number;
};


type ChannelMessage = {
  from: number
  channelid: number
  message: string
}


type Channel = {
  isPrivate: boalean;
  isProtected?: boolean;
  name: string;
  members: User[];
  admin: User;
  membersCount: number;
  imageUrl?: string;
  createdAt?: string;
 s?: ChannelMessage[];
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
  socket?: Socket;
  directMessages?: DirectMessage[];
  setDirectMessages?: (value: DirectMessage[]) => void;
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
  Users?: User[];
  socket?: Socket;
  authenticated?: boolean;
  setAuthenticated?: (value: boolean) => void;
}



// Chat Events Types

type GameInvitation = {
  from: number;
  to: number;
}