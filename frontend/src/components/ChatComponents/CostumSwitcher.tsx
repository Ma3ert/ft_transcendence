import { HStack, Box } from "@chakra-ui/react"
import { useState } from "react"

interface CostumSwitcherProps {
    state:boolean
    stateSetter:React.Dispatch<React.SetStateAction<boolean>>
}
const CostumSwitcher:React.FC<CostumSwitcherProps> = ({state, stateSetter})=>{
    const toggle = () =>  stateSetter (!state)
    return (
        <HStack cursor={'pointer'} _hover={{opacity:0.8, transform:'scale(1.1)'}} transition={'all 0.3s ease-in'} width={'39px'} h='20px' borderRadius={'50px'} justifyContent={state ? 'end' : 'start'} onClick={toggle} bg={state ? '#DC585B' : '#252932'}>
            <Box bg={state ? 'white' : '#5B6171'} w={'18px'} h={'18px'} borderRadius={'full'}>
            </Box>
        </HStack>
    )
}

export default CostumSwitcher