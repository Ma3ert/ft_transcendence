
import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "../ChatComponents/Header";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface GlobalLayoutProps {
    children: React.ReactNode;
}

const GlobalLayout:React.FC<GlobalLayoutProps> = ({children}) => {
    const {currentUser, updateUser} = useAuth()
    const router = useRouter()

    if (!currentUser)
      router.push("/")
    return (
        <Grid templateRows={"15vh 85vh"} w="100%" h="100%">
        <GridItem w="100%" h="100%" justifyContent="center" alignItems="center">
          <Header />
        </GridItem>
        <GridItem
          mx='auto'
          // border="1px"
          // borderColor="green"
          w={{sm:'98%', lg:'95%', xl:'90%', vl:'66%'}}
          h="100%"
          justifyContent="center"
          alignItems="center"
          display={'flex'}
        >
          {children}
        </GridItem>
      </Grid>
    )
    }


export default GlobalLayout;