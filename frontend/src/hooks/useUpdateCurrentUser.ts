import Cookies from "js-cookie"
import { AxiosResponse } from 'axios';
import apiClient from '../services/requestProcessor';
import { useRequestProcessor } from './useRequestProcessor';
import { useAuth } from "./useAuth";
import { Dispatch } from "react";

interface updateCurrentUser {
    currentUserSetter?: (user: any) => void;
}

export function useUpdateCurrentUser({currentUserSetter}: updateCurrentUser) {
    const client = new apiClient("/users");
    const { useQueryWrapper } = useRequestProcessor()

    const updateCurrentUser: QueryArgs = {
        queryKey: ["current-user"],
        queryFunction: () => { client.getData("/me").then((res: AxiosResponse)=> {
            console.log("query function is fired")
            console.log(res.data.data)
            Cookies.set('currentUser', JSON.stringify(res.data.data));
            console.log("the cookie is set");
            currentUserSetter && currentUserSetter(useAuth());
            // console.log("from the queryfunctionJ: ", useAuth())
        }).catch((err) => (console.log(err))) } 
    }
    const queryReturn = useQueryWrapper(updateCurrentUser)
    if (queryReturn.isLoading) console.log("Loading")
    if (queryReturn.isSuccess) return queryReturn
}
