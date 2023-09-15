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
  bodySetter?: React.Dispatch<React.SetStateAction<number>>;
}

const SideBar: React.FC<Props> = ({ bodySetter }) => {
  const size = "25px";
  return (
    <Stack
      spacing={{
        base: 10,
        sm: "10px",
        md: "15px",
        lg: "35px",
        xl: "50px",
        vl: "100px",
      }}
    >
      <Link href={"/sections/lobby"}>
        <IconButton
          color="#5B6171"
          onClick={() => {
            bodySetter && bodySetter(0);
          }}
          icon={AiFillHome}
          size={size}
        />
      </Link>
      <Link href={"/sections/notifications"}>
        <IconButton
          color="#5B6171"
          onClick={() => {
            bodySetter && bodySetter(0);
          }}
          icon={BiSolidBell}
          size={size}
        />
      </Link>

      <Link href={"/sections/achievements"}>
        <IconButton
          color="#5B6171"
          onClick={() => {
            bodySetter && bodySetter(1);
          }}
          icon={FaMedal}
          size={size}
        />
      </Link>
      <Link href={"/sections/chat"}>
        <IconButton
          color="#5B6171"
          onClick={() => {
            bodySetter && bodySetter(2);
          }}
          icon={FaUserGroup}
          size={size}
        />
      </Link>
      <Link href={"/sections/settings"}>
        <IconButton
          color="#5B6171"
          onClick={() => {
            bodySetter && bodySetter(3);
          }}
          icon={IoMdSettings}
          size={size}
        />
      </Link>
    </Stack>
  );
};

export default SideBar;
