import React from "react";
import { Button, Icon } from "@chakra-ui/react";

interface Props {
  icon: any;
  size: string;
  color: string;
  onClick?: () => void;
}

const IconButton = ({ onClick, icon, size, color }: Props) => {
  var action: () => void | undefined;
  if (onClick !== undefined) action = onClick;
  else action = () => {};
  return (
    <Button variant={"icon"} onClick={action} maxW={"50px"}>
      <Icon
        as={icon}
        style={{ fontSize: size }}
        color={color}
        _hover={{
          color: "#CDCDC2",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          transform: "scale(1.2)",
        }}
      />
    </Button>
  );
};

export default IconButton;
