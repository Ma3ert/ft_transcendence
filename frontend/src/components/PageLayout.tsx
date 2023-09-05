import { Wrap } from '@chakra-ui/react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import React, { ReactNode } from 'react'
import SideBar from './SideBar';

type Props = {
  body: ReactNode;
  bodySetter: React.Dispatch<React.SetStateAction<number>>
}

const PageLayout = ({body, bodySetter}: Props) => {
  return (
    <Wrap spacingX={"90px"} align={"center"} marginLeft={"500px"}>
      <SideBar bodySetter={bodySetter}></SideBar>
      {body}
    </Wrap>
  )
}

export default PageLayout