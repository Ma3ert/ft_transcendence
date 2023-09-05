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
        content:'Hello world you bitch',
        incoming:true,
        time:'12:00',
        Author:friendsList[0]
    },
    {
        content:'FUCK YOU',
        incoming:false,
        time:'12:01',
        Author:friendsList[1]
    },
    {
        content:'i am sorry i guess you can fuck yourself now',
        incoming:true,
        time:'12:01',
        Author:friendsList[1]
    }
,
{
    content:'i am sorry i guess you can fuck yourself now',
    incoming:true,
    time:'12:01',
    Author:friendsList[1]
},
{
    content:'i am sorry i guess you can fuck yourself now',
    incoming:true,
    time:'12:01',
    Author:friendsList[1]
},
{
    content:'i am sorry i guess you can fuck yourself now',
    incoming:true,
    time:'12:01',
    Author:friendsList[1]
}]