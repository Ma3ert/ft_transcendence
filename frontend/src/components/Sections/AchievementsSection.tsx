/* eslint-disable react/jsx-key */
import React, { ReactNode, useContext, useState } from "react";
import { AppNavigationContext } from "@/context/Contexts";
import { Stack } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import UserRankField from "../UserRankField";
import { useQuery } from "react-query";
import apiClient from "@/services/requestProcessor";
import { AxiosResponse } from "axios";
import { useAuth } from "@/hooks/useAuth";
interface AchievementsSectionsProps {}
const AchievementsSection: React.FC<AchievementsSectionsProps> = ({}) => {
  const client = new apiClient("/users/rank");
  const { currentUser, updateUser } = useAuth();
  const [localRank, setLocal] = useState<ReactNode[]>([]);
  const [allRank, setAll] = useState<ReactNode[]>([]);
  // <UserRankField userPic='' userName='ma3ert'></UserRankField>

  const local = useQuery({
    queryKey: ["rank", "local"],
    queryFn: () =>
      client.getData("/local").then((res: AxiosResponse) => {
        const localRes: ReactNode[] = [];
        console.log(res.data.current.ranks);
        res.data.current.ranks.map((user: any, index:number) => {
          user.avatar.includes("http")
            ? user.avatar
            : "http://e1r9p3.1337.ma:3000/public/users/imgs/" + user.avatar;
          const variant =
            user.id === currentUser.user.id ? "secondField" : "field";
          localRes.push(
            <UserRankField
              lvl={user.level}
              xp={user.xp}
              key={index}
              variant={variant}
              rank={user.order}
              userName={user.username}
              userPic={
                user.avatar.includes("http")
                  ? user.avatar
                  : "http://e1r9p3.1337.ma:3000/public/users/imgs/" +
                    user.avatar
              }
            />
          );
        });
        setLocal(localRes);
      }),
  });

  const all = useQuery({
    queryKey: ["rank", "global"],
    queryFn: () =>
      client.getData("/all").then((res: AxiosResponse) => {
        ////console.log("I get to the query");
        ////console.log("the res from the all rank ", res.data.current);
        const allRes: ReactNode[] = [];
        res.data.current.ranks.map((user: any, index:number) => {
          user.avatar.includes("http")
            ? user.avatar
            : "http://e1r9p3.1337.ma:3000/public/users/imgs/" + user.avatar;
          const variant =
            user.id === currentUser.user.id ? "secondField" : "field";
          allRes.push(
            <UserRankField
              lvl={user.level}
              xp={user.xp}
              key={index}
              variant={variant}
              rank={user.order}
              userName={user.username}
              userPic={
                user.avatar.includes("http")
                  ? user.avatar
                  : "http://e1r9p3.1337.ma:3000/public/users/imgs/" +
                    user.avatar
              }
            />
          );
        });
        setAll(allRes);
      }),
  });

  const { achievementsSection } = useContext(AppNavigationContext);
  return (
    <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
      {achievementsSection == "achievements" ? (
        <ScrollableStack> {!local.isLoading && localRank} </ScrollableStack>
      ) : (
        <ScrollableStack> {!all.isLoading && allRank} </ScrollableStack>
      )}
    </Stack>
  );
};

export default AchievementsSection;
