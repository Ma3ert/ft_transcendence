'use client'
import GlobalLayout from "@/components/Layouts/GlobalLayout";

interface props {
  children: React.ReactNode;
}
const Layout: React.FC<props> = ({ children }) => {
  return <GlobalLayout>{children}</GlobalLayout>;
};

export default Layout;