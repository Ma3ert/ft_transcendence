
const PRIVATE = true
const CHANNEL = false
type Section  = "home" | "chat" | "game" | "settings" | "achievements" | "notifications"
type ChatType = PRIVATE | CHANNEL

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

interface AppNavigationContext {
    currentSection?:Section 
    getCurrentSectionType?: () => Section
    setCurrentSection?: (value:Section) => void
    sections: Map<Section,JSX.Element>
}

interface ChatNavigationContext {
    chatType?:ChatType
    getCurrentSection? : () => ChatTyype
    setCurrentSection? : (value:ChatType) => void
}