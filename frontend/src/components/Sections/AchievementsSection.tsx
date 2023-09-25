/* eslint-disable react/jsx-key */
import React, { useContext } from 'react';
import { AppNavigationContext } from '@/context/Contexts';
import { Stack } from '@chakra-ui/react';
import ScrollableStack from '../ScrollableStack';
import UserRankField from '../UserRankField';
interface AchievementsSectionsProps {}
const AchievementsSection: React.FC<AchievementsSectionsProps> = ({}) => {
    const rank=[
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
        <UserRankField userPic='' userName='ma3ert'></UserRankField>,
    ]
    const { achievementsSection } = useContext(AppNavigationContext);
    return (
        <Stack w='100%' h='100%' justifyContent='center' alignItems='center'>
                {achievementsSection == 'achievements' ? <ScrollableStack items={rank} width={535} height={624} spacing='25px'/> : <ScrollableStack items={rank} width={535} height={624} spacing='25px'/>}
        </Stack>
    )
}

export default AchievementsSection