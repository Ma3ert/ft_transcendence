import EventListener from "../../utils/EventListener"
import {Socket} from 'socket.io-client'

const useEventHandler = (socket:Socket) => {

    return (eventName:EventName, handler:EventHandler) => {
        EventListener (socket,eventName, handler)
    }
}

export default useEventHandler