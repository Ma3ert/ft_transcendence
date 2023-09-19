import { AppNavigationContext } from "@/context/Contexts"
import { useState } from "react"
import Achievements from "@/components/Achievements"
import Lobby from "@/components/Lobby"
import Chat from "@/components/ChatComponents/Chat"
import Settings from "@/components/Setting"

interface AppNavigationProps {
    children:React.ReactNode
}

const AppNavigationProvider:React.FC<AppNavigationProps> = ({children}) =>{
    
    const [section, setSection] =  useState<Section> ("home")
    const SectionsMap = new Map<Section, JSX.Element> ()
    
    SectionsMap.set ('achievements', <Achievements />)
    SectionsMap.set ('chat', <Chat />)
    SectionsMap.set ('settings', <Settings/>)
    SectionsMap.set ('home', <Lobby/>)

    const getCurrentSectionType = () => section
    const setCurrentSection = (section:Section) => setSection(section)
    
    // SectionsMap.set ('notifications', <Notifications />)
    return (
            <AppNavigationContext.Provider value={{currentSection:section, getCurrentSectionType, setCurrentSection, sections:SectionsMap}}>
                    {children}
            </AppNavigationContext.Provider>
    )
}


export default AppNavigationProvider