import apiClient from "@/services/requestProcessor"
import { useMutation } from "react-query";
import {useToast} from "@chakra-ui/react"

const useUserOptions = () => {

    const enviteUserClient = new apiClient("/invites");
    const toast = useToast()

    const enviteUser = async (user:User) => {
        const response = await enviteUserClient.postData({invitedUser:user.id})
        return response
    }
    const EnviteUserMutation = useMutation({
        mutationFn:enviteUser,
        onSuccess:(data)=>{
            console.log(data);
            toast({
                title: "Friend request sent.",
                description: "Your friend request has been sent successfully.",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
        },
        onError:(error)=>{
            toast({
                title: "An error occurred.",
                description: "Your friend request has not been sent.",
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            console.log(error);
        }
    })
    function EnviteUser (user:User)
    {
        EnviteUserMutation.mutate(user)
    }

    return {EnviteUser}
}

export default useUserOptions