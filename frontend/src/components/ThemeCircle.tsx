import { Box } from "@chakra-ui/react";

interface themeProps {
    right: string;
    left: string;
    size: string;
    onClick?: (() => void) | undefined
}

export const ThemeCircle = ({onClick, right, left, size}: themeProps) => {
    return (

    <Box
        as="button"
        onClick={onClick}
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxSize={size}
        borderRadius="full"
        position="relative"
        overflow="hidden"
    >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="50%"
          bottom="0"
          bg={left}
        ></Box>
        <Box
          position="absolute"
          top="0"
          left="50%"
          right="0"
          bottom="0"
          bg={right}
        ></Box>
    </Box>
    )
}