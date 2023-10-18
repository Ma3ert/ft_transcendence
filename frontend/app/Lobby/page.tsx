"use client";
import HomeSection from "@/components/Sections/HomeSection";
import { Box } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context/Contexts";
import GlobalLayout from "@/components/Layouts/GlobalLayout";
import MainLayout from "@/components/Layouts/MainLayout";

const page = () => {
  return (
    <MainLayout>
      <HomeSection />
    </MainLayout>
  );
};

export default page;
