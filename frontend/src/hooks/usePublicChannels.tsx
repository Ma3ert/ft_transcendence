import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/requestProcessor";


const usePublicChannels = ()=>{
    
    const publicChannelsClient = new apiClient("/chat/public/");
    
     const {data, isError, isLoading} = useQuery(["publicChannels"], {
        queryFn: async () => publicChannelsClient.getData().then((res) => res.data),
        onSuccess: (data: Channel[]) => {
         console.table (data)
        },
        onError: (err) => {},
      });

      return {data, isError, isLoading}
  }


  export default usePublicChannels