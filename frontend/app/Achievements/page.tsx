'use client'
import GlobalLayout from "@/components/Layouts/GlobalLayout"
import MainLayout from "@/components/Layouts/MainLayout"
import AchievementsSection from "@/components/Sections/AchievementsSection"
const page = () => {
    return (
            <MainLayout>
                <AchievementsSection />
            </MainLayout>
    )
}

export default page