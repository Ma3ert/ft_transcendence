import { AppNavigationContext, ChatContext, UsersContext } from "@/context/Contexts";
import { Tabs, TabList, Tab, Wrap, Text, Icon } from "@chakra-ui/react";
import { useContext } from "react";
import { FaUserPlus, FaMedal, FaTrophy } from "react-icons/fa";
import { BiSolidUser, BiSolidLockAlt } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import { NotificationWrapper } from "../ChatComponents/NotificationBadge";
import { BsPersonFillAdd } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
interface TabsWrapperProps {
  tabs: Tab[];
}
interface TabsTogglerWrapperProps extends TabsWrapperProps {
  type: boolean;
  section: string;
}

const Toggler: React.FC<TabsTogglerWrapperProps> = ({ tabs, type, section }) => {


  const getCurrentIndex = () => (section === "home" ? 0 : 1);
  return (
    <ControlledTabsContainer
      controlled={section === "home" || section === "chat"}
      index={getCurrentIndex()}
    >
      <TabList w={type ? "220px" : "180px"}>
        {tabs.map((tab, index) => {
          return (
            <Tab key={index} py={2} onClick={tab.action}>
              {tab.value}
            </Tab>
          );
        })}
      </TabList>
    </ControlledTabsContainer>
  );
};

interface ControlledTabsContainer {
  controlled: boolean;
  index?: number;
  children: React.ReactNode;
}

const ControlledTabsContainer: React.FC<ControlledTabsContainer> = ({
  controlled,
  index,
  children,
}) => {
  return (
    <>
      {controlled ? (
        <Tabs
          index={index}
          isFitted
          variant={"default"}
          align="center"
          w="100%"
          h="100%"
        >
          {children}
        </Tabs>
      ) : (
        <Tabs isFitted variant={"default"} align="center" w="100%" h="100%">
          {children}
        </Tabs>
      )}
    </>
  );
};



const getCurrentSection = (path:string) =>{
  return path.split('/')[1].toLowerCase()
}

const TabsWrapper: React.FC = () => {
  const {setFriendsSection, setAchievementsSection, setSettingsSection} = useContext (AppNavigationContext)
  const {chatNotifications, inviteNotifications} = useContext(UsersContext);
  const router = useRouter();
  const pathname = usePathname();
  const ChatLobbyTabs: Tab[] = [
    {
      value: <Text>Lobby</Text>,
      action: () => router.push("/Lobby"),
    },
    {
      value: <Text>Chat</Text>,
      action: () => router.push("/Chat"),
    },
  ];
  const FriendsTabs: Tab[] = [
    {
      value: <Icon as={FaUserPlus} style={{ fontSize: "23px" }}  />,
      action: () => setFriendsSection && setFriendsSection("friends"),
    },
    {
      value: <Icon as={FaUserGroup} style={{ fontSize: "23px" }} />,
      action: () => setFriendsSection && setFriendsSection("channels"),
    },
    {
      value: <Icon as={BsPersonFillAdd} style={{ fontSize: "23px" }} />,
      action: () => setFriendsSection && setFriendsSection("requests"),
    }
  ];
  const AchievementsTabs: Tab[] = [
    {
      value: <Icon as={FaMedal} style={{ fontSize: "23px" }} />,
      action: () =>
        setAchievementsSection && setAchievementsSection("achievements"),
    },
    {
      value: <Icon as={FaTrophy} style={{ fontSize: "23px" }} />,
      action: () =>
        setAchievementsSection && setAchievementsSection("leaderboard"),
    },
  ];
  const SettingsTabs: Tab[] = [
    {
      value: <Icon as={BiSolidUser} style={{ fontSize: "23px" }} />,
      action: () => setSettingsSection && setSettingsSection("userSettings"),
    },
    {
      value: <Icon as={BiSolidLockAlt} style={{ fontSize: "23px" }} />,
      action: () =>
        setSettingsSection && setSettingsSection("passwordSettings"),
    },
  ];
  const section = getCurrentSection(pathname)
  console.log ('section : ', section )
  return (
    <Wrap
      w="100%"
      h="100%"
      display={"flex"}
      justifyContent="center"
      alignItems="center"
    >
      {
        (() => {
          switch (section) {
            case "home":
              return (
                <NotificationWrapper type='activeChat' status={chatNotifications!}>
                  <Toggler section={section} tabs={ChatLobbyTabs} type={true} />
                </NotificationWrapper>
              );
            case "chat":
              return <Toggler section={section} tabs={ChatLobbyTabs} type={true} />;
            case "friends":
              return <Toggler section={section} tabs={FriendsTabs} type={true} />;
            case "achievements":
              return <Toggler section={section} tabs={AchievementsTabs} type={true} />;
            case "settings":
              return <Toggler section={section} tabs={SettingsTabs} type={true} />;
            default:
              return <Toggler section={section} tabs={ChatLobbyTabs} type={false} />;
          }
        })()}
    </Wrap>
  );
};

export default TabsWrapper;
