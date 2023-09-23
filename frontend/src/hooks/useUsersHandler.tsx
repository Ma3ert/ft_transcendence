import apiClient from "@/services/requestProcessor";
import { useRequestProcessor } from "./useRequestProcessor";
import { AllUsersRoute, UserByIdRoute } from "../../contstants";


function useUsersHanlder() {
  const { useQueryWrapper } = useRequestProcessor();

  // Get all users
  const useGetAllUsers = () => {
    const allUsersClient = new apiClient(AllUsersRoute);
    const allUsersArgs: QueryArgs = {
      queryKey: "AllUsers",
      queryFunction: function (): void {
        throw new Error("Function not implemented.");
      },
    };

    useQueryWrapper(allUsersArgs);
  };

  // Get user by id
  const useGetUserById = () => {
    const userByIdClient = (userid: number) =>
      new apiClient(UserByIdRoute(userid));

    const userByIdArgs: QueryArgs = {
      queryKey: "UserById",
      queryFunction: function (): void {
        throw new Error("Function not implemented.");
      },
    };
    useQueryWrapper(userByIdArgs);
  };
}
