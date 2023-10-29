import MembersList from "@/components/ChatComponents/MembersList";
// constants definitions
export const PRIVATE = true;
export const CHANNEL = false;

export const loggedIndUser: User = {
  username: "7amid",
  avatar: "https://source.unsplash.com/random/?profile=5",
  id: "fd451",
};

export const messages: DirectMessage[] = [];

export const Channels: Channel[] = [];

export const ChannelTypes: string[] = [
  "Private channels",
  "Public channels",
  "Protected channels",
  "Private messages",
];

export const channelSettings: string[] = [
  "Members",
  "Set password",
  "Edit Channel",
];

export const ProtectedChannelSettings: string[] = ["Members", "Edit Channel"];

export const ChannelMemberSettings: string[] = ["Members"];

// Channel

// users routes
export const AllUsersRoute = `${process.env.REACT_APP_API_URL}/users`;
export const UserByIdRoute = (id: number) =>
  `${process.env.REACT_APP_API_URL}/users/${id}`;
export const AvailableUserRoute = `${process.env.REACT_APP_API_URL}/invites/users/`;

// chat routes

// game route

export const options: MenuOption[] = [
  {
    description: "Invite to join game",
    type: "normal",
    modal: true,
    channelSettings: false,
    modalType: "default",
  },
  {
    description: "Invite to join channel",
    type: "normal",
    modal: true,
    channelSettings: false,
    modalType: "default",
  },
  {
    description: "Send friend request",
    type: "normal",
    modal: false,
    channelSettings: false,
  },
  {
    description: "See Profile",
    type: "normal",
    modal: true,
    channelSettings: false,
    modalType: "largeModal",
  },
  {
    description: "Make party admin",
    type: "normal",
    modal: false,
    channelSettings: true,
  },
  {
    description: "Remove party admin",
    type: "normal",
    modal: false,
    channelSettings: true,
  },
  {
    description: "Ban from channel",
    type: "critical",
    modal: true,
    channelSettings: true,
    modalType: "default",
  },
  {
    description: "Kick from channel",
    type: "critical",
    modal: true,
    channelSettings: true,
    modalType: "default",
  },
  {
    description: "Unban",
    type: "critical",
    modal: true,
    channelSettings: true,
    modalType: "default",
  },
  {
    description: "Mute",
    type: "critical",
    modal: true,
    channelSettings: true,
    modalType: "default",
  },
  {
    description: "Block",
    type: "critical",
    modal: true,
    modalType: "default",
  },
  {
    description: "Unmute",
    type: "critical",
    modal: true,
    channelSettings: true,
    modalType: "default",
  },
  {
    description: "Unblock",
    type: "critical",
    modal: true,
    modalType: "default",
  },
];

export const gameTheme = [
  {
    one: "#D9D9D9",
    two: "#DC585B",
    ball: "#D9D9D9",
    border:false,
  },
  {
    one: "#181D25",
    two: "#5B6171",
    ball: "#DC585B",
    border:true,
  },
  {
    one: "#4D4C7D",
    two: "#F99417",
    ball: "#F5F5F5",
    border:false,
  },
  {
    one: "#184e77",
    two: "#d9ed92",
    ball: "#52b69a",
    border:false,
  },
];
