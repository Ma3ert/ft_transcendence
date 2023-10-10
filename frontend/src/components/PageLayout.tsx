import { Grid, GridItem, Wrap } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import SideBar from './SideBar';

type Props = {
  body: ReactNode;
  bodySetter: React.Dispatch<React.SetStateAction<number>>
}

const PageLayout = ({body, bodySetter}: Props) => {
  return (
    <Grid margin={"auto"} templateColumns={"repeat(10, 1fr)"} alignItems={"center"} w={{ base: "100%", xl: "90%" }}>
      <GridItem colSpan={{ base:10, md: 1, xl: 1 }}>
        <SideBar bodySetter={bodySetter}></SideBar>
      </GridItem>
      <GridItem colSpan={{ base: 10, md: 9,xl : 9}}>
        {body}
      </GridItem>
    </Grid>
  )
}

export default PageLayout