import { HStack, Icon, Text, Input, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { TbArrowBackUp } from "react-icons/tb";

interface FriendsListHeaderProps {
  friendsListType: "friends" | "search";
  setFriendsListType: React.Dispatch<
    React.SetStateAction<"friends" | "search">
  >;
}

const FriendsListHeader: React.FC<FriendsListHeaderProps> = ({
  friendsListType,
  setFriendsListType,
}) => {
  return (
    <>
      {friendsListType === "friends" ? (
        <HStack
          w="100%"
          justifyContent={"space-between"}
          maxW={{ sm: "400px", md: "450px", lg: "500px", xl: "700px" }}
          minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
          px={4}
        >
          <Text fontSize="xl" color="#5B6171" fontWeight={'bold'}>
            Your Friends List
          </Text>
          <Button
            variant={"ghost"}
            _hover={{ opacity: "0.8" }}
            onClick={() => setFriendsListType("search")}
          >
            <Icon as={Search2Icon} fontSize="23px" />
          </Button>
        </HStack>
      ) : (
        <HStack
          w={"100%"}
          h={"100%"}
          maxW={{ sm: "400px", md: "450px", lg: "500px", xl: "700px" }}
          minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
          bg="#1D222C"
          borderRadius={"15px"}
          maxH={"50px"}
          px={1}
          py={1}
        >
          <Input
            flex={1}
            outline={"none"}
            border={"none"}
            boxShadow={"none"}
            _active={{ boxShadow: "none", outline: "none" }}
            _focus={{ boxShadow: "none", outline: "none" }}
            bg="transparent"
            color="#5B6171"
            placeholder="Search for New Friends"
            _placeholder={{ fontSize: "sm", color: "#5B6171" }}
            w={"100%"}
            h={"100%"}
            fontSize={"sm"}
            py={2}
          />

          <Icon
            as={TbArrowBackUp}
            _hover={{ transform: "scal(1.1)", cursor: "pointer" }}
            fontSize="23px"
            color="#DC585B"
            onClick={() => setFriendsListType("friends")}
          />
          <Button
            bg="#D9D9D9"
            color="#DC585B"
            borderRadius={"15px"}
            w="10%"
            h="98%"
            py={2}
            _hover={{ opacity: "0.8" }}
          >
            <Icon as={Search2Icon} fontSize="sm" />
          </Button>
        </HStack>
      )}
    </>
  );
};

export default FriendsListHeader;
