import { FormControl, Stack, Input, HStack, Button, Text } from "@chakra-ui/react";
import layoutStyles from "../../Styles/modules/layout.module.scss";
import { friendsList } from "../../../contstants";
import UserAvatar from "../UserAvatar";
interface MembersListProps {}
const MembersList: React.FC<MembersListProps> = ({}) => {
  return (
    <Stack spacing={4} w="100%" h='100%' maxH='100%' >
      <FormControl w="100%">
        <Input
          variant="default"
          w="95%"
          placeholder="searching for a friend !!"
        />
      </FormControl>
      <Stack
        w="100%"
        h={"auto"}
        maxH={'250px'}
        overflowY={"auto"}
        borderRadius={"xl"}
        bg="#1D222C"
        spacing={4}
        className={layoutStyles.scroll}
        p={4}
      >
        {friendsList.map((member, index) => {
          return (
            <Button key={index} variant="ghost" w="98%" color='#5B6171' _hover={{bg:'#5B6171', color:'#1D222C'}} px={6} py={8}>
              <HStack spacing={4} w='100%'>
                <UserAvatar user={member} />

                <Text fontSize='sm' fontWeight='bold'>
                    {member.username}
                </Text>
              </HStack>
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default MembersList;
