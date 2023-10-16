'use client'
import GlobalLayout from "@/components/Layouts/GlobalLayout"
import MainLayout from "@/components/Layouts/MainLayout"
import FriendsSection from "@/components/Sections/FriendsSection"
const page = () => {
    return (
            <MainLayout>
                <FriendsSection />
            </MainLayout>
    )
}

export default page