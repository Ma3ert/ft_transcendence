import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { AppNavigationContext } from '@/context/Contexts';
import GameHistory from '../ChatComponents/GameHistory';
import GameStats from '../ChatComponents/GameStats';
interface StatsSectionProps{
    
    }
const StatsSection:React.FC<StatsSectionProps> = ({})=>{
    const {statsSection} = useContext(AppNavigationContext)
    return (<Stack w={'100%'} h='100%' justifyContent={'center'} alignItems={'center'}>
        {<GameHistory />}
    </Stack>)
}

export default StatsSection;