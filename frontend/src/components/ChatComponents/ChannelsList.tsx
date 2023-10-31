import { useSafeLayoutEffect } from "@chakra-ui/react"
import FriendsListHeader from "./FriendsListHeader"
import { useContext, useEffect, useState } from "react"
import ScrollableStack from "../ScrollableStack"
import { Text, Stack } from "@chakra-ui/react"
import ChannelField from "./ChannelField"
import { UserChannelsContext } from "@/context/Contexts"
interface props {

}

const ChannelsList:React.FC<props> = ({
 
}) =>{

    const {Channels, PublicChannels} = useContext (UserChannelsContext)
    const [userChannels, setUserChannels] = useState <Channel[]> (Channels!)
    const [publicChannels, setPublicChannels] = useState <Channel[]> (PublicChannels!)

    useEffect (()=>{
        setUserChannels (Channels!)
        setPublicChannels (PublicChannels!)
    }, [Channels, PublicChannels])
    return <>
       <FriendsListHeader
        type="channels"
        setChannelsList={setUserChannels!}
        setPublicChannels={setPublicChannels!}
      />
      <ScrollableStack>
        {userChannels && userChannels!.length > 0 ? (
          <>
            <Stack spacing={3} w="100%" h="auto">
              <Text p={5} color="#5B6171">
                Your channels
              </Text>
              {userChannels!.map((channel:Channel, index:number) => (
                <ChannelField key={index} channel={channel} />
              ))}
            </Stack>
            (
            {publicChannels && publicChannels.length > 0 && (
              <Stack spacing={3} w="100%" h="auto">
                <Text p={5} color="#5B6171">
                  Public channels
                </Text>
                {publicChannels!.map((channel, index) => (
                  <ChannelField key={index} channel={channel} />
                ))}
              </Stack>
            )}
            )
          </>
        ) : (
          <Stack
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <p style={{ color: "#5B6171" }}>
              You have no channels at the moment
            </p>
          </Stack>
        )}
      </ScrollableStack>
    </>
}

export default ChannelsList