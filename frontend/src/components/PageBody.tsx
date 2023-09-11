import { Stack, TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import React, { ReactNode } from 'react'

type Props = {
    navBar: ReactNode;
    tabs: ReactNode[];
    bodys: ReactNode[];
}

const PageBody = ({navBar, tabs, bodys}: Props) => {
  return (
    <Stack spacing={1}   w={'100%'} align={"center"} justify={'center'} border="1px" borderColor='red'  h={'auto'}>
        <Tabs isFitted variant={"default"} align='center'>
            <TabList  w={"180px"} h={"45px"} >
                 {tabs.map((tab, index) => (<Tab key={index}>{tab}</Tab>))}
            </TabList>
            <TabPanels marginTop={"50px"}>
              {bodys.map((body, index) => (<TabPanel key={index}>{body}</TabPanel>))}
            </TabPanels>
        </Tabs>
    </Stack>
  )
}

export default PageBody