export const filterUsers = (search: string, users: User[]) => {
    return users.filter((user) => user.username.includes(search));
}

export const filterChannels = (search: string, channels: Channel[]) => {
    return channels.filter((channel) => channel.name.includes(search));
}

