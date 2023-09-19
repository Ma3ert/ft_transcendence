"use client";
import { Stack } from "@chakra-ui/react";
import IconButton from "./IconButton";
import { AiFillHome } from "react-icons/ai";
import { BiSolidBell } from "react-icons/bi";
import { FaMedal } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";

interface Props {
  currentSection: Section;
  sectionSetter: (section: Section) => void;
}

const SideBar: React.FC<Props> = ({ currentSection, sectionSetter }) => {
  const size = "25px";
  const links = new Map<Section, React.ElementType> ();

  links.set ("home", AiFillHome)
  links.set ("notifications", BiSolidBell)
  links.set ("achievements", FaMedal)
  links.set ("chat", FaUserGroup)
  links.set ("settings", IoMdSettings)

  return (
    <Stack
      spacing={{sm:8, md:10, lg:12, xl:14}}
      w='100%'
      h='100%'
      justifyContent='center'
      alignItems='center'
    >
      {Array.from (links).map (([section, icon]) => (
        <IconButton 
          color={currentSection === section ? "#DC585B" : "#5B6171"}
          onClick={() => sectionSetter (section)}
          icon={icon}
          size={currentSection === section ? "35px" : size}
          key={section}
        />
      ))
          }
      
    </Stack>
  );
};

export default SideBar;
