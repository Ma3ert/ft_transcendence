import { Button, ModalContent, useDisclosure, Modal, ModalCloseButton, ModalBody, Text } from "@chakra-ui/react"
import ConfirmationModal from "./ConfirmationModal"

interface MenuModalProps {
    value:string
    componentName:string
}
const MenuModal:React.FC<MenuModalProps> =  ({value, componentName})=>{
    const BanFromChannel = <ConfirmationModal buttonValue={'Ban from channel'} buttonVariant={'menuItemImportant'} actionDescription={'ban user from this channel'} actionKeyword={'ban'}/>
    const kickFromChannel = <ConfirmationModal buttonValue={'Kick from channel'} buttonVariant={'menuItemImportant'} actionDescription={'kick user from this channel'} actionKeyword={'kick'}/>
    const Mute = <ConfirmationModal buttonValue={'Mute'} buttonVariant={'menuItemImportant'} actionDescription={'mute user'} actionKeyword={'mute'}/>
    const Block = <ConfirmationModal buttonValue={'Block'} buttonVariant={'menuItemImportant'} actionDescription={'block user'} actionKeyword={'block'}/>
    const components =  new Map<string, JSX.Element> ();
    components.set('Ban from channel', BanFromChannel)
    components.set ('Kick from channel', kickFromChannel)
    components.set ('Mute', Mute)
    components.set ('Block', Block)

    return (
      components.get(componentName) ? components.get(componentName) : <Text>value</Text>
    )
}

export default MenuModal;