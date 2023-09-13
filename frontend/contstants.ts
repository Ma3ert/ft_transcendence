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
        content:'lorem ipsum dolor sit amet',
        incoming:true,
        time:'12:00',
        Author:friendsList[0]
    },
    {
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        incoming:false,
        time:'12:01',
        Author:friendsList[1]
    },
    {
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        incoming:true,
        time:'12:01',
        Author:friendsList[1]
    }
,
{
    content:'lorem ipsum dolor sit amet, dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    incoming:true,
    time:'12:01',
    Author:friendsList[0]
},
{
    content:'ipsim dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    incoming:true,
    time:'12:01',
    Author:friendsList[1]
},
{
    content:'amet  consectetur adipisicing elit. Quisquam, voluptatum.',                                                                            
    incoming:true,
    time:'12:01',
    Author:friendsList[0]
}]

export const Channels:Channel[] =[
    {
        isPrivate:true,
        name:'New Channel',
        members:friendsList,
        admin:friendsList[0],
        membersCount:3
    }
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