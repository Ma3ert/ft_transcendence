import { FormControl, HStack, Input } from "@chakra-ui/react";
interface FilterBoxProps {
    action?:any

}
const FilterBox:React.FC<FilterBoxProps> =  ({})=>{
    return (
        <HStack borderRadius={'29px'} bg='#252932' justify={'space-between'} alignItems={'center'} w='99%' px={2} >
            <FormControl w='100%'>
                <Input type="text" fontSize={'xs'} bg={'transparent'} color='white' _active={{outline:'none', border:'none', boxShadow:'none'}} _focus={{outline:'none', border:'none', boxShadow:'none'}}  placeholder="type keyword ..." outline='none' border='none' w='100%' p={1} _placeholder={{color:'#5B6171'}} />
            </FormControl>    
        </HStack>
    )
}

export default FilterBox;