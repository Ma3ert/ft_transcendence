import { AppNavigationContext } from "@/context/Contexts";
import { useState } from "react";
import AchievementsSection from "../components/Sections/AchievementsSection";
import ChatSection from "../components/Sections/ChatSection";
import FriendsSection from "../components/Sections/FriendsSection";
import LobbySection from "../components/Sections/LobbySection";
import NotificationsSection from "../components/Sections/NotificationsSection";
import SettingsSection from "../components/Sections/SettingsSection";

interface AppNavigationProps {
  children: React.ReactNode;
}

const AppNavigationProvider: React.FC<AppNavigationProps> = ({ children }) => {
  const [section, setSection] = useState<Section>("lobby");
  const [friendsSection, setFriendsSection] =
    useState<FriendsSection>("friends");
  const [achievementsSection, setAchievementsSection] =
    useState<AchievementsSection>("achievements");
  const [settingsSection, setSettingsSection] =
    useState<SettingsSection>("userSettings");
  const SectionsMap = new Map<Section, JSX.Element>();

  SectionsMap.set("achievements", <AchievementsSection />);
  SectionsMap.set("notifications", <NotificationsSection />);
  SectionsMap.set("settings", <SettingsSection />);
  SectionsMap.set("lobby", <LobbySection />);
  SectionsMap.set("chat", <ChatSection />)
  SectionsMap.set ("friends", <FriendsSection />)

  const getCurrentSectionType = () => section;
  const setCurrentSection = (section: Section) => setSection(section);

  // SectionsMap.set ('notifications', <Notifications />)
  return (
    <AppNavigationContext.Provider
      value={{
        currentSection: section,
        getCurrentSectionType,
        setCurrentSection,
        sections: SectionsMap,
        friendsSection,
        setFriendsSection,
        achievementsSection,
        setAchievementsSection,
        settingsSection,
        setSettingsSection,
      }}
    >
      {children}
    </AppNavigationContext.Provider>
  );
};

export default AppNavigationProvider;
