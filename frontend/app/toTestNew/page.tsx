"use client"

import Achievements from "@/components/Achievements"
import BoxScore from "@/components/BoxScore"
import FriendSection from "@/components/FriendSection"
import Lobby from "@/components/Lobby"
import NavBar from "@/components/NavBar"
import NotificationCenter from "@/components/NotificationCenter"
import Setting from "@/components/Setting"
import TwoFaAuPopUp from "@/components/TwoFaAuPopUp"
import { Button, Input } from "@chakra-ui/react"

export default function Home() {
    return (
        // <TwoFaAuPopUp></TwoFaAuPopUp>
        // <BoxScore
        //     leftPlayer="ma3ert"
        //     rightPlayer="sbardila"
        //     leftScore={2}
        //     rightScore={5}
        // />
        // <NavBar></NavBar>
        // <Achievements></Achievements>
        // <Lobby/>
        // <FriendSection></FriendSection>
        // <Setting></Setting>
        <>
           {/* <label htmlFor="Utilisateur">Cliquez ici</label> */}
           <Button as={"label"} htmlFor="Utilisateur" >sbardila</Button>
           <Input visibility={"hidden"} type="file" id="Utilisateur" name="Nom" onChange={() => } />
        </>
    )
}