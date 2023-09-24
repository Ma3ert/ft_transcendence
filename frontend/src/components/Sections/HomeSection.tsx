import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import AppNavigationProvider from "@/providers/AppNavigationProvider";

interface HomeSectionProps {
    children:React.ReactNode
}
const HomeSection: React.FC<HomeSectionProps> = ({children}) => {

    return (
        <AppNavigationProvider>
        <Grid templateRows={"15vh 85vh"} w="100%" h="100%">
          <GridItem
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Header />
          </GridItem>
          <GridItem
            border="1px"
            borderColor="green"
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            {children}
          </GridItem>
        </Grid>
      </AppNavigationProvider>
    )
}
export default HomeSection;