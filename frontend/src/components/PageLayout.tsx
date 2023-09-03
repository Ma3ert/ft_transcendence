import { Stack, TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import React, { ReactNode } from 'react'

type Props = {
    navBar: ReactNode;
    tabs: ReactNode[];
    bodys: ReactNode[];
}

const PageLayout = ({navBar, tabs, bodys}: Props) => {
  return (
    <Stack spacing={"80px"} align={"center"} margin={"auto"}>
        {navBar}
        <Tabs isFitted variant={"default"} align='center'>
            <TabList  w={"180px"} h={"45px"} >
                 {tabs.map((tab) => (<Tab>{tab}</Tab>))}
            </TabList>
            <TabPanels marginTop={"50px"}>
              {bodys.map((body) => (<TabPanel>{body}</TabPanel>))}
            </TabPanels>
        </Tabs>
    </Stack>
  )
}

export default PageLayout