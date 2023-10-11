import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import AppNavigationProvider from "@/providers/AppNavigationProvider";
import { useQuery } from "react-query";
import apiClient from "@/services/requestProcessor";
import { useContext, useEffect } from "react";
import { GlobalContext, UsersContext } from "@/context/Contexts";
import { NotifyServer } from "../../../utils/eventEmitter";

interface HomeSectionProps {
  children: React.ReactNode;
}

const HomeSection: React.FC<HomeSectionProps> = ({ children }) => {

  const { socket } = useContext(GlobalContext);
  const {loggedInUser} = useContext (UsersContext)
  useEffect(() => {
    NotifyServer(socket, "userIsLoggedIn", loggedInUser!);
  }, []);
  return (
    <AppNavigationProvider>
      <Grid templateRows={"15vh 85vh"} w="100%" h="100%">
        <GridItem w="100%" h="100%" justifyContent="center" alignItems="center">
          <Header />
        </GridItem>
        <GridItem
          // border="1px"
          // borderColor="green"
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </GridItem>
      </Grid>
    </AppNavigationProvider>
  );
};
export default HomeSection;
