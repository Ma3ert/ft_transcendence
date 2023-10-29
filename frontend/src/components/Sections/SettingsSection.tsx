import { AppNavigationContext } from "@/context/Contexts";
import { Stack, Text } from "@chakra-ui/react";
import { useContext } from "react"
import UserSetting from "../UserSetting";
import UserProfileModal from "../ChatComponents/UserProfileModal";
import { useAuth } from "@/hooks/useAuth";
import { GameSetting } from "../GameSetting";
interface SettingsSectionProps {}
const SettingsSection: React.FC<SettingsSectionProps> = ({}) => {
  const { settingsSection } = useContext(AppNavigationContext);
  return (
    <Stack
      w="100%"
      h="100%"
      // border={"1px"}
      // borderColor="blue"
      justifyContent={"center"}
      alignItems={"center"}
    >
      {settingsSection == "userSettings" ? (
          <UserSetting/>
      ) : (
          <GameSetting/>
      )}
    </Stack>
  );
};

export default SettingsSection;
