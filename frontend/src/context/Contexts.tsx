import { createContext } from "react";

export type Game = {
    playerID: number;
    gameID: String | null;
    me?: any | null;
    opponent?: any | null;
};

type DispatchGame = React.Dispatch<React.SetStateAction<Game>>;

interface GameContextType {
    gameSettings: Game;
    setGameSettings: DispatchGame;
}

export const AppNavigationContext = createContext<AppNavigationContext>({});
export const ChatContext = createContext<ChatContext>({});
export const ModalContext = createContext<ModalContext>({});
export const AuthUser = createContext<AuthUserContext>({});
export const GlobalContext = createContext<GlobalContext>({});
export const UsersContext = createContext <UsersContext> ({});
export const ChannelsContext = createContext <ChannelsContext> ({});
export const ModalWrapperContext = createContext<ModalWrapperContext>({});
export const DmContext = createContext<DmContext>({});
export const CmContext = createContext<CmContext>({});
export const MembersContext = createContext<MembersContext>({});
export const GameContext = createContext<GameContextType>({} as GameContextType);
export const InvitesContext = createContext<InvitesContext>({});
export const UserStatusContext = createContext<UserStatusContext>({});
export const UserChannelsContext = createContext <UsersChannelsContext> ({})
