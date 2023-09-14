type User = {
    imageUrl:string,
    username:string,
    online:boolean
}

type Message = {
    content:string,
    incoming:boolean,
    time:string
    Author:User
    EnviteMessage:boolean
}

type Channel = {
    isPrivate:boalean
    name:string,
    members:User[],
    admin:User,
    membersCount:number,
    imageUrl?:string
}

type friendAction = {
    actionName:string
    important:boolean
}