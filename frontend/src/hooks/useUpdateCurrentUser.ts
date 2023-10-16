import Cookies from "js-cookie"
import { AxiosResponse } from 'axios';
import apiClient from '../services/requestProcessor';
import { useRequestProcessor } from './useRequestProcessor';
import { useAuth } from "./useAuth";
import { Dispatch } from "react";

interface updateCurrentUser {
    currentUser: any,
    updateUser: (() => void) | undefined
}

export function useUpdateCurrentUser() {
    const client = new apiClient("/users");

    client.getData("/me").then((res: AxiosResponse)=> {
        console.log("query function is fired")
        console.log(res.data.data)
        Cookies.set('currentUser', JSON.stringify(res.data.data));
        console.log("the cookie is set");
    }).catch((err) => (console.log(err)))
}
