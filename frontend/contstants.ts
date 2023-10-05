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
  "Edit channel",
];

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
    modal:false,
    channelSettings:false
  },
  {
    description: "Invite to join channel",
    type: "normal",
    modal:true,
    channelSettings:false
  },
  {
    description: "Send friend request",
    type: "normal",
    modal:false,
    channelSettings:false
  },
  {
    description: "See Profile",
    type: "normal",
    modal:true,
    channelSettings:false
  },
  {
    description: "Make party admin",
    type: "normal",
    modal:false,
    channelSettings:true
  },
  {
    description: "Remove party admin",
    type: "normal",
    modal:false,
    channelSettings:true
  },
  {
    description: "Ban from channel",
    type: "critical",
    modal:true,
    channelSettings:true
  },
  {
    description: "Kick from channel",
    type: "critical",
    modal:true,
    channelSettings:true
  },
  {
    description: "Unban",
    type: "critical",
    modal:true,
    channelSettings:true
  },
  {
    description: "Mute",
    type: "critical",
    modal:true,
    channelSettings:true
  },
  {
    description: "Block",
    type: "critical",
    modal:true
  },
  {
    description: "Unmute",
    type: "critical",
    modal:true,
    channelSettings:true
  },
  {
    description: "Unblock",
    type: "critical",
    modal:true
  },
];
