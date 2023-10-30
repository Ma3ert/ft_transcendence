"use client";
import Game from "@/components/GameComponents/Game";
import MainLayout from "@/components/Layouts/MainLayout";
import GlobalProvider from "@/providers/GlobalProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthUserProvider from "@/providers/AuthUserProvider";
import UsersProvider from "@/providers/UsersProvider";
import ChatProvider from "@/providers/ChatProvider";
import ChannelsProvider from "@/providers/ChannelsProvider";
import AppNavigationProvider from "@/providers/AppNavigationProvider";
import GameProvider from "@/providers/GameProvider";
import InvitesProvider from "@/providers/InvitesProvider";

const page = () => {
  return <Game />;
};

export default page;
