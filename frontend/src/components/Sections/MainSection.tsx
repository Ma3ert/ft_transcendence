import { Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import SideBar from "../SideBar";
import { AppNavigationContext } from "@/context/Contexts";
import TabsWrapper from "../Wrappers/tabsWrapper";
interface MainSectionProps {}

const MainSection: React.FC<MainSectionProps> = ({}) => {
  const { getCurrentSectionType, setCurrentSection, sections } =
    useContext(AppNavigationContext);
  return (
    <Grid
      templateColumns={"8vw 1fr"}
      w="100%"
      h="100%"
      // border="1px"
      // borderColor="blue"
    >
      <GridItem w="100%" h="100%" 
      // border="1px" borderColor="yellow"
      >
        <SideBar
          currentSection={
            (getCurrentSectionType && getCurrentSectionType()) || "lobby"
          }
          sectionSetter={setCurrentSection!}
        />
      </GridItem>
      <GridItem
        w="100%"
        h="100%"
        // border="1px"
        // borderColor="red"
        justifyContent={"center"}
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
            {getCurrentSectionType
              ? sections?.get(getCurrentSectionType())
              : sections?.get("lobby")}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default MainSection;
