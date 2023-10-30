/* eslint-disable react/jsx-key */
import React from "react";
import ScrollableStack from "@/components/ScrollableStack";
import NavBar from "@/components/NavBar";
import ProgressLevel from "@/components/ProgressLevel";
import LobbyParty from "@/components/LobbyParty";
import { useAuth } from "@/hooks/useAuth";

type Props = {};

const LobbySection = (props: Props) => {
  const {currentUser, updateUser} = useAuth();

  return (
      <LobbyParty />
  // <Stack align={"center"} justifyContent={"center"}>
  //   <Grid templateColumns={"repeat(8, 1fr)"} placeItems="center">
  //     <GridItem
  //       colSpan={{ base: 8, lg: 2 }}
  //       >
  //         <ProgressLevel/>
  //     </GridItem>
  //     <GridItem
  //     colSpan={{ base: 8, lg: 6 }}
  //     >
  //     </GridItem>
  //   </Grid>
  // </Stack>
  );
};

export default LobbySection;