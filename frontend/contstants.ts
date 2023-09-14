export const CHAT = true
export const LOBBY = false


export const friendsList:User[] = [{
    username:'7amid',
    imageUrl:'https://source.unsplash.com/random/?profile',
    online:false
}, 
{
    username:'Rachid',
    imageUrl:'',
    online:true
},
{
    username:'Wa7id45',
    imageUrl:'',
    online:true
},

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
    },
    {
        isPrivate:false,
        name:'New Channel',
        members:friendsList,
        admin:friendsList[1],
        membersCount:3,
        imageUrl:'https://source.unsplash.com/random/?army',
    },
    {
        isPrivate:true,
        name:'cat Channel',
        members:friendsList,
        admin:friendsList[0],
        membersCount:3,
        imageUrl:'https://source.unsplash.com/random/?cats',
    },
]


export const ChannelTypes:string[] = [
    'Private channels',
    'Public channels',
    'Protected channels',
    'Private messages'
]

export const UserSettings:friendAction [] = [
    {
        actionName:'Invite to game',
        important:false
    },
    {
        actionName:'See Profile',
        important:false
    },
    {
        actionName:'Make party admin',
        important:false
    },
    {
        actionName:'Make channel owner',
        important:false
    },
    {
        actionName:'Ban from channel',
        important:true
    },
    {
        actionName:'Kick from channel',
        important:true
    },
    {
        actionName:'Mute',
        important:true
    },
    {
        actionName:'Block',
        important:true
    },

]