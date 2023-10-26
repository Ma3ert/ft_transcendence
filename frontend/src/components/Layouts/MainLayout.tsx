import { Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import SideBar from "../SideBar";
import { AppNavigationContext } from "@/context/Contexts";
import TabsWrapper from "../Wrappers/tabsWrapper";
interface MainSectionProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainSectionProps> = ({children}) => {
 
  return (
    <Grid
      templateColumns={"auto 1fr"}
      w="100%"
      h="100%"
      // border="1px"
      // borderColor="blue"
    >
      <GridItem w="100%" h="100%" 
      // border="1px" borderColor="yellow"
      >
        <SideBar/>
      </GridItem>
      <GridItem
        w="100%"
        h="100%"
        border="1px"
        borderColor="red"
        // justifyContent={"center"}
        alignItems="center"
      >
        <Grid templateRows={"10vh 75vh"} w="100%" h="100%">
          <GridItem>
            <TabsWrapper />
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            justifyContent={"center"}
            alignItems="center"
          >
          {children}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
