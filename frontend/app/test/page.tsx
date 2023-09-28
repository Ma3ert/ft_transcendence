"use client";
import HomeSection from "@/components/Sections/HomeSection";
import MainSection from "@/components/Sections/MainSection";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import LoginPage from "@/components/Sections/LoginPage";
import { GlobalContext } from "@/context/Contexts";
import UsersProvider from "@/providers/UsersProvider";

export default function Home() {
  const { authenticated } = useContext(GlobalContext);
  return (
    <Box>
      {authenticated ? (
        <UsersProvider>
          <HomeSection>
            <MainSection />
          </HomeSection>
        </UsersProvider>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
}
