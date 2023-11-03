export const getUserRole = (user:User, Members:Member[]) => {
  if (Members)
  {
    const res = Members.find(
        (member) => member.user === user!.id
      );
      if (res) return res.role;
      return "MEMBER";
  } 
  };

export const isUserBanned = (user:User, Members:Member[]) => {
  if (!Members)
    return false;
    const res = Members.find(
      (member) => member.user === user!.id
    );
    if (res) return res.banned;
    return false;
  }
  export const isUserMutted = (user:User, Members:Member[]) => {
    if (!Members)
      return false;
    const res = Members.find(
      (member) => member.user === user!.id
    );
    if (res) return res.muted;
    return false;
  }