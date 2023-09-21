import { Stack , Text } from "@chakra-ui/react"

interface NotificationsSectionProps {}
const NotificationsSection:React.FC<NotificationsSectionProps> = ({}) => {
    return (
        <Stack w='100%' h='100%' bg='#1D222C' borderRadius='2xl' p={4} spacing={4}>
            <Text color='#fff' fontSize='xl' fontWeight='bold'>Notifications</Text>
        </Stack>
    )
}

export default NotificationsSection