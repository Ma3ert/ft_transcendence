import React, { ReactNode } from 'react'
import ScrollableStack from './ScrollableStack'
import NotificationField from './NotificationField'
import { Icon } from '@chakra-ui/react'
import {FaUserGroup, FaUserPlus} from "react-icons/fa6"

type Props = {}

const NotificationCenter = (props: Props) => {
    const notifs: ReactNode[] = [
        <NotificationField 
            Icon={<Icon as={FaUserPlus} style={{ fontSize: "23px" }}/>}
            senderAvatar=''
            senderUserName='Ma3ert'
            notifType='Friend-request'
            time=""
        />,
        <NotificationField 
            Icon={<Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>}
            senderAvatar=''
            senderUserName='Ma3ert'
            notifType='Friend-request'
            time=""
        />,
        <NotificationField 
            Icon={<Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>}
            senderAvatar=''
            senderUserName='Ma3ert'
            notifType='Friend-request'
            time=""
        />,
        <NotificationField 
            Icon={<Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>}
            senderAvatar=''
            senderUserName='Ma3ert'
            notifType='Friend-request'
            time=""
        />,
        <NotificationField 
            Icon={<Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>}
            senderAvatar=''
            senderUserName='Ma3ert'
            notifType='Friend-request'
            time=""
        />,
        <NotificationField 
            Icon={<Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>}
            senderAvatar=''
            senderUserName='Ma3ert'
            notifType='Friend-request'
            time=""
        />
    ]
  return (
    <ScrollableStack
        width={420}
        height={400}
        items={notifs}
        spacing='5px'
    />
  )
}

export default NotificationCenter