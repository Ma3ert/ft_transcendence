import MembersList from "@/components/ChatComponents/MembersList"
// constants definitions
export const PRIVATE = true
export const CHANNEL = false


export const friendsList:User[] = [{
    username:'7amid',
    imageUrl:'https://source.unsplash.com/random/?profile',
    online:false,
    id:1,
    level: 12
}, 
{
    username:'Rachid',
    imageUrl:'https://source.unsplash.com/random/?profile=3',
    online:true,
    id:2,
    level: 1
},
{
    username:'Wa7id45',
    imageUrl:'https://source.unsplash.com/random/?profile=1',
    online:true,
    id:3,
    level:5
},
{
    username:'Sami78',
    imageUrl:'https://source.unsplash.com/random/?profile=2',
    online:true,
    id:4,
    level:22
}

]

export const messages:Message[] = [
    {
        content:'',
        incoming:true,
        time:'12:00',
        Author:friendsList[0],
        EnviteMessage:true
    },
    {
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        incoming:false,
        time:'12:01',
        Author:friendsList[1],
        EnviteMessage:false
    },
    {
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        incoming:true,
        time:'12:01',
        Author:friendsList[1],
        EnviteMessage:false
    }
,
{
    content:'lorem ipsum dolor sit amet, dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    incoming:true,
    time:'12:01',
    Author:friendsList[0],
    EnviteMessage:false
},
{
    content:'ipsim dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    incoming:true,
    time:'12:01',
    Author:friendsList[1],
    EnviteMessage:false
},
{
    content:'',                                                                            
    incoming:false,
    time:'12:01',
    Author:friendsList[0],
    EnviteMessage:true
}]

export const Channels:Channel[] =[
    {
        isPrivate:true,
        name:'New Channel',
        members:friendsList,
        admin:friendsList[0],
        membersCount:3,
        imageUrl:'https://source.unsplash.com/random/?car',
        id:1
    },
    {
        isPrivate:false,
        name:'test Channel',
        members:friendsList,
        admin:friendsList[1],
        membersCount:3,
        imageUrl:'https://source.unsplash.com/random/?army',
        id:2
    },
    {
        isPrivate:true,
        name:'cat Channel',
        members:friendsList,
        admin:friendsList[0],
        membersCount:3,
        imageUrl:'https://source.unsplash.com/random/?cats',
        id:3
    },
]


export const ChannelTypes:string[] = [
    'Private channels',
    'Public channels',
    'Protected channels',
    'Private messages'
]

export const channelSettings:string[] = [
    'Members',
    'Set password',
    'Edit channel',
]


// Channel

export const UserSettings:friendAction [] = [
    {
        actionName:'Invite to game',
        modal:false,
        important:false
    },
    {
        actionName:'See Profile',
        modal:true,
        important:false
    },
    {
        actionName:'Make party admin',
        modal:false,
        important:false
    },
    {
        actionName:'Make channel owner',
        modal:false,
        important:false
    },
    {
        actionName:'Ban from channel',
        modal:false,
        important:true
    },
    {
        actionName:'Kick from channel',
        modal:false,
        important:true
    },
    {
        actionName:'Mute',
        modal:false,
        important:true
    },
    {
        actionName:'Block',
        modal:false,
        important:true
    },

]