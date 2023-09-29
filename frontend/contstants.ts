import MembersList from "@/components/ChatComponents/MembersList"
// constants definitions
export const PRIVATE = true
export const CHANNEL = false

export const loggedIndUser:User = {
    username:'7amid',
    avatar:'https://source.unsplash.com/random/?profile=5',
    id:'fd451',
}

export const friendsList:User[] = [{
    username:'7amid',
    avatar:'https://source.unsplash.com/random/?profile',
    id:'0',
}, 
{
    username:'Rachid',
    avatar:'https://source.unsplash.com/random/?profile=3',
    id:'2',
},
{
    username:'Wa7id45',
    avatar:'https://source.unsplash.com/random/?profile=1',
    id:'3',
},
{
    username:'Sami78',
    avatar:'https://source.unsplash.com/random/?profile=2',
    id:'4',
}

]

export const messages:DirectMessage[] = [
    
    {
        message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        game:false,
        from:0,
        to:1,
    },
    {
        message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
        game:false,
        from:1,
        to:0,
    }
,
{
    message:'lorem ipsum dolor sit amet, dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    game:false,
    from:1,
    to:0,    
},
{
    message:'ipsim dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    game:false,
    from:1,
    to:0,    
},
]

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

// users routes
export const  AllUsersRoute = `${process.env.REACT_APP_API_URL}/users`
export const  UserByIdRoute = (id:number) => `${process.env.REACT_APP_API_URL}/users/${id}`
export const  AvailableUserRoute = `${process.env.REACT_APP_API_URL}/invites/users/`

// chat routes 

// game routes