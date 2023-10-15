import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useToast } from "@chakra-ui/react"    
interface AvatarData {
    avatar:string
    channel:string
  }

const useAvatarUpdater = () => {

    const toast  = useToast ()
    const queryClient = useQueryClient ()
    const updateAvatarMutation = useMutation ({
        mutationFn: async (req:AvatarData) => await axios.patch(`http://localhost:3000/chat/channels/avatar`, {...req}, {
        withCredentials:true
        }),
      onSuccess: () => {
        queryClient.invalidateQueries('channels')
        toast ({
          title: "Avatar updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      },
      onError : (error) => console.log(error)
    }
    )

    function updateAvatar (req:AvatarData) {
        updateAvatarMutation.mutate(req)
    }
    return {updateAvatar}
}

export default useAvatarUpdater