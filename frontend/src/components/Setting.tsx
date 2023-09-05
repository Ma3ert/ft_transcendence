import React from 'react'
import NavBar from '@/components/NavBar';
import { Icon } from '@chakra-ui/react';
import {BiSolidLockAlt, BiSolidUser} from "react-icons/bi"

import UserSetting from '@/components/UserSetting';
import PasswordSetting from '@/components/PasswordSetting';
import PageBody from '@/components/PageBody';


type Props = {}

const Setting = (props: Props) => {
  return (
    <PageBody
    navBar={<NavBar/>}
    tabs={[<Icon as={BiSolidUser} style={{ fontSize: "23px" }}/>,
           <Icon as={BiSolidLockAlt} style={{ fontSize: "23px" }}/>]}
    bodys={[<UserSetting></UserSetting>, <PasswordSetting></PasswordSetting>, ]}
  />
  )
}

export default Setting