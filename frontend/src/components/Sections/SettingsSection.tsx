import { AppNavigationContext } from "@/context/Contexts";
import { Stack } from "@chakra-ui/react";
import { useContext } from "react";
import PasswordSetting from "../PasswordSetting";
import UserSetting from "../UserSetting";
interface SettingsSectionProps {}
const SettingsSection: React.FC<SettingsSectionProps> = ({}) => {
  const { settingsSection } = useContext(AppNavigationContext);
  return (
    <Stack w="100%" h="100%" border={'1px'} borderColor='blue' justifyContent={'center'} alignItems={'center'}>
      {settingsSection == "userSettings" ? (
        <UserSetting />
      ) : (
        <PasswordSetting />
      )}
    </Stack>
  );
};


export default SettingsSection;