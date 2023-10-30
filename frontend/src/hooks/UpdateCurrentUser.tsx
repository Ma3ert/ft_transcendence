import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import apiClient from "../services/requestProcessor";
import { useRequestProcessor } from "./useRequestProcessor";
import { useAuth } from "./useAuth";
import { Dispatch } from "react";

interface updateCurrentUser {
  currentUser: any;
  updateUser: (() => void) | undefined;
}

export async function UpdateCurrentUser() {
  const client = new apiClient("/users");

  return client.getData("/me").then((res: AxiosResponse) => {
    ////console.log("all the data: ", res.data);
    ////console.log("query function is fired");
    ////console.log(res.data.current);
    const avatar: string = res.data.current.user.avatar;
    if (!avatar.includes("http"))
      res.data.current.user.avatar =
        "http://e1r9p3.1337.ma:3000/public/users/imgs/" + avatar;
    // Cookies.set('currentUser', JSON.stringify(res.data.data));
    return res.data.current;
  });
}