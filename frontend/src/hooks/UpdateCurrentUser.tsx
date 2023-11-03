import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import apiClient from "../services/requestProcessor";
import { useAuth } from "./useAuth";
import { Dispatch } from "react";

interface updateCurrentUser {
  currentUser: any;
  updateUser: (() => void) | undefined;
}

export async function UpdateCurrentUser() {
  const client = new apiClient("/users");

  return client.getData("/me").then((res: AxiosResponse) => {
    const avatar: string = res.data.current.user.avatar;
    if (!avatar.includes("http"))
      res.data.current.user.avatar =
        "http://e1r9p5.1337.ma:3000/public/users/imgs/" + avatar;
    return res.data.current;
  });
}