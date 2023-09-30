const filterUsers = (search: string, users: User[]) => {
    return users.filter((user) => user.username.includes(search));
}

export default filterUsers;
