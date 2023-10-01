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

// game routes

export const friendOptions: MenuOption[] = [
  {
    description: "Invite to game",
    type: "normal",
  },
  {
    description: "See Profile",
    type: "normal",
  },
  {
    description: "Make party admin",
    type: "normal",
  },
  {
    description: "Make channel owner",
    type: "normal",
  },
  {
    description: "Ban from channel",
    type: "critical",
  },
  {
    description: "Kick from channel",
    type: "critical",
  },
  {
    description: "Mute",
    type: "critical",
  },
  {
    description: "Block",
    type: "critical",
  },
];

export const globalUserOptions: MenuOption[] = [
  {
    description: "See Profile",
    type: "normal",
  },
  {
    description: "Send friend request",
    type: "normal",
  },
];
