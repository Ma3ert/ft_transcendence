type User = {
    imageUrl:string,
    username:string,
    online:boolean,
    level:number,
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
    isProtected?:boolean
    name:string,
    members:User[],
    admin:User,
    membersCount:number,
    imageUrl?:string
    createdAt?:string
    messages?:Message[]
}

type friendAction = {
    actionName:string
    modal:boolean
    important:boolean
}