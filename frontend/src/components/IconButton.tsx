import React from 'react'
import { Button, Icon } from "@chakra-ui/react";


interface Props {
    icon: any;
    size: string;
    onClick?: () => void;
}

const IconButton = ({ onClick, icon, size }: Props) => {
  var action : () => void | undefined
  if (onClick !== undefined)
    action = onClick
  else
    action = () => {}
  return (
    <Button variant={"icon"} onClick={action}>
       <Icon as={icon} style={{ fontSize: size }}/>
    </Button>
  )
}

export default IconButton