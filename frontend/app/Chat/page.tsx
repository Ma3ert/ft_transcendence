"use client";
import GlobalLayout from "@/components/Layouts/GlobalLayout";
import MainLayout from "@/components/Layouts/MainLayout";
import ChatSection from "@/components/Sections/ChatSection";
const page = () => {
  return (
    <MainLayout>
      <ChatSection />
    </MainLayout>
  );
};

export default page;
