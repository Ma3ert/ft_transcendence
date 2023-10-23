/* eslint-disable react/jsx-key */
import React, { ReactNode, useContext, useState } from 'react';
import { AppNavigationContext } from '@/context/Contexts';
import { Stack } from '@chakra-ui/react';
import ScrollableStack from '../ScrollableStack';
import UserRankField from '../UserRankField';
import { useQuery } from 'react-query';
import apiClient from '@/services/requestProcessor';
import { AxiosResponse } from 'axios';
interface AchievementsSectionsProps {}
const AchievementsSection: React.FC<AchievementsSectionsProps> = ({}) => {
    const client = new apiClient("/users/rank")
    const [localRank, setLocal] = useState<ReactNode[]>([])
    const [allRank, setAll] = useState<ReactNode[]>([])
    // <UserRankField userPic='' userName='ma3ert'></UserRankField>

    const local = useQuery({
        queryKey: ["rank", "local"],
        queryFn: () => client.getData("/local").then((res: AxiosResponse) => {
            console.log("I get to the query")
            console.log("the res from the local rank: ", res.data.current);
            const localRes: ReactNode[] = [];
            res.data.current.ranks.map((user: any) => {
                user.avatar.includes("http") ? user.avatar : "http://localhost:3000/public/users/imgs/" + user.avatar
                localRes.push(<UserRankField rank={user.order} userName={user.username} 
                userPic={user.avatar.includes("http") ? user.avatar : "http://localhost:3000/public/users/imgs/" + user.avatar}/>)
            })
            setLocal(localRes)

        })
    })

    const all = useQuery({
        queryKey: ["rank", "global"],
        queryFn: () => client.getData("/all").then((res: AxiosResponse) => {
            console.log("I get to the query")
            console.log("the res from the all rank ", res.data.current);
            const allRes: ReactNode[] = [];
            res.data.current.ranks.map((user: any) => {
                user.avatar.includes("http") ? user.avatar : "http://localhost:3000/public/users/imgs/" + user.avatar
                allRes.push(<UserRankField rank={user.order} userName={user.username} 
                userPic={user.avatar.includes("http") ? user.avatar : "http://localhost:3000/public/users/imgs/" + user.avatar}/>)
            })
            setAll(allRes)
        })
    })

    const { achievementsSection } = useContext(AppNavigationContext);
    return (
        <Stack w='100%' h='100%' justifyContent='center' alignItems='center'>
            {achievementsSection == 'achievements' 
                ? <ScrollableStack> {!local.isLoading && localRank} </ScrollableStack>
                : <ScrollableStack> {!all.isLoading && allRank} </ScrollableStack>}
        </Stack>
    )
}

export default AchievementsSection