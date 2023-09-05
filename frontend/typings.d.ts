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
}