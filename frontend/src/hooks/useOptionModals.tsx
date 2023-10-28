import UserProfileModal from "@/components/ChatComponents/UserProfileModal";
import InviteToChannels from "@/components/ChatComponents/InviteToChannels";

const useOptionModals = (user:User) => {
    const modals = new Map([
        [
          "See Profile",
          (user: User) => {
            return <UserProfileModal user={user!} />;
          },
        ],
        [
          "Invite to join channel",
          (user: User) => {
            return <InviteToChannels user={user!} />;
          },
        ],
      ]);
      return {modals}
    }

export default useOptionModals