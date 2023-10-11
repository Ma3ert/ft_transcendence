import { HStack, Box } from "@chakra-ui/react"
import { useState } from "react"

interface CostumSwitcherProps {}
const CostumSwitcher:React.FC<CostumSwitcherProps> = ({})=>{
    const [checked, setChecked] = useState<boolean> (false)
    const toggle = () =>  setChecked (!checked)
    return (
        <HStack cursor={'pointer'} _hover={{opacity:0.8, transform:'scale(1.1)'}} transition={'all 0.3s ease-in'} width={'39px'} h='20px' borderRadius={'50px'} justifyContent={checked ? 'end' : 'start'} onClick={toggle} bg={checked ? '#DC585B' : '#252932'}>
            <Box bg={checked ? 'white' : '#5B6171'} w={'18px'} h={'18px'} borderRadius={'full'}>
            </Box>
        </HStack>
    )
}

export default CostumSwitcher