"use client"

import Achievements from "@/components/Achievements"
import BoxScore from "@/components/BoxScore"
import FriendSection from "@/components/FriendSection"
import NavBar from "@/components/NavBar"
import NotificationCenter from "@/components/NotificationCenter"
import TwoFaAuPopUp from "@/components/TwoFaAuPopUp"

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
        <FriendSection></FriendSection>
    )
}