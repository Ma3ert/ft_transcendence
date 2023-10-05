export const getUserRole = (user:User, Members:Member[]) => {
    const res = Members.find(
      (member) => member.userId === user!.id
    );
    if (res) return res.role;
    return "MEMBER";
  };