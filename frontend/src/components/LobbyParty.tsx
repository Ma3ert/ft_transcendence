import { Button, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import SoloLobbyParty from './SoloLobbyParty';
import MultiLobbyParty from './MultiLobbyParty';

type Props = {
  username: string;
  ready: boolean;
  other: string;
  otherReady: boolean
  alone: boolean;
}

const LobbyParty = ({alone, username, ready, other, otherReady}: Props) => {
  return (
    <Stack spacing={"52px"} align={"center"}>
        <MultiLobbyParty username={username} ready={ready} other={other} otherReady={otherReady} alone={alone}/>
        <Image
          src='/Shadow.png'
          w={"341px"}
          h={"27px"}>
        </Image>
        <Button
            variant={"primary"}
            w={"217px"}
            h={"60px"}
            fontSize={"25px"}
        >Ready</Button>
    </Stack>
  )
}

export default LobbyParty