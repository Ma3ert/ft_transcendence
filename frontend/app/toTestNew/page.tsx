"use client"

import BoxScore from "@/components/BoxScore"
import NotificationCenter from "@/components/NotificationCenter"
import TwoFaAuPopUp from "@/components/TwoFaAuPopUp"

export default function Home() {
    return (
        // <TwoFaAuPopUp></TwoFaAuPopUp>
        <BoxScore
            leftPlayer="ma3ert"
            rightPlayer="sbardila"
            leftScore={2}
            rightScore={5}
        />
    )
}