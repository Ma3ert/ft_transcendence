"use client";
import {
  extendTheme,
  ThemeConfig,
  ComponentStyleConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
};

const ProgressStyle: ComponentStyleConfig = {
  variants: {
    default: {
      colorScheme: "#252932",
      bg: "#5B6171",
      borderRadius: "full",
      p: "1px",
    },
  },
};

const ModalStyle: ComponentStyleConfig = {
  // sizes:{
  //   invite:{
  //     content: {
  //       width: "362px",
  //       height: "386px"
  //     }
  //   }
  // },
  variants: {
    default: {
      dialog: {
        bg: "#252932",
        borderRadius: "20px",
        px: "30px",
        py: "40px",
        fontFamily: "visbyRound",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px;",
      },
      body: {
        fontFamily: "visbyRound",
        margin: "0px",
        padding: "0px",
        minH: "300px",
        h: "auto",
      },
      closeButton: {
        fontStyle: "bold",
        fontWeight: "black",
        fontSize: "8px",
        boxSize: "20px",
        borderRadius: "full",
        bg: "#DC585B",
        color: "#252932",
        _active: {
          transform: "scale(1.1)",
        },
        _hover: {
          opacity: 0.8,
        },
      },
    },
    largeModal: {
      dialog: {
        bg: "#252932",
        borderRadius: "20px",
        px: "30px",
        py: "40px",
        fontFamily: "visbyRound",
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px;",
        minW:'50vw',
        minH:'50vh',
      },
      body: {
        fontFamily: "visbyRound",
        margin: "0px",
        padding: "0px",
        minH: "300px",
        h: "auto",
      },
      closeButton: {
        fontStyle: "bold",
        fontWeight: "black",
        fontSize: "8px",
        boxSize: "20px",
        borderRadius: "full",
        bg: "#DC585B",
        color: "#252932",
        _active: {
          transform: "scale(1.1)",
        },
        _hover: {
          opacity: 0.8,
        },
      },
    },
    form: {
      dialog: {
        fontFamily: "visbyRound",
        bg: "#252932",
        borderRadius: "20px",
        padding: "auto",
        px: "30px",
        py: "40px",
      },
      body: {
        fontFamily: "visbyRound",
        margin: "0px",
        px: "0px",
        py: "10px",
      },
      closeButton: {
        fontStyle: "bold",
        fontSize: "8px",
        boxSize: "20px",
        borderRadius: "full",
        bg: "#DC585B",
        color: "#252932",
        _active: {
          transform: "scale(1.1)",
        },
      },
    },
  },
};

const ButtonStyle: ComponentStyleConfig = {
  // style object for base or default style
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "#DC585B",
      fontSize: "sm",
      borderRadius: "50px",
      color: "#F5F5F5",
      py: "7px",
      px: "8px",
      fontFamily: "visbyRound",
      _active: {
        // Customize the styles when button is active (clicked)
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    secondary: {
      bg: "#F5F5F5",
      fontSize: "sm",
      borderRadius: "50px",
      color: "#DC585B",
      py: "7px",
      px: "8px",
      fontFamily: "visbyRound",
      _active: {
        // Customize the styles when button is active (clicked)
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    ghost: {
      bg: "transparent",
      color: "#5B6171",
      fontsize: "sm",
      alignContent: "center",
      py: "7px",
      px: "20px",
      fontFamily: "visbyRound",
      _hover: {
        bg: "transparent",
        color: "#D9D9D9", // Change this to your desired hover text color
      },
      _active: {
        bg: "transparent",
        color: "#D9D9D9", // Change this to your desired hover text color
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    MenuOption: {
      bg: "transparent",
      fontSize: "sm",
      border: "none",
      outline: "none",
      w: "auto",
      h: "auto",
      _hover: {},
      _active: {},
    },
    lightGray: {
      bg: "#5B6171",
      color: "#1D222C",
      fontSize: "xs",
      borderRadius: "xl",
      border: "none",
      px: "12px",
      h: "30px",
      fontFamily: "visbyRound",
      _hover: {
        opacity: "0.8",
      },
      _active: {
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    modalCanel: {
      _hover: { opacity: 0.8 },
      _active: { transform: "scale(1.1)" },
      borderRadius: "xl",
      bg : "#1D222C",
      color: "#5B6171",
      fontSize: "sm",
      px: 6,
      py: 3,
    },
    modalConfirm: {
      _hover: { opacity: 0.8 },
      _active: { transform: "scale(1.1)" },
      borderRadius: "xl",
      bg : "#D9D9D9",
      color: "#DC585B",
      fontSize: "sm",
      px: 6,
      py: 3,
    },
    darkGray: {
      color: "#5B6171",
      bg: "#1D222C",
      fontSize: "xs",
      borderRadius: "xl",
      border: "none",
      px: "12px",
      h: "30px",
      fontFamily: "visbyRound",
      _hover: {
        opacity: "0.8",
      },
      _active: {
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    largeGhost: {
      bg: "transparent",
      color: "#5B6171",
      _hover: {
        bg: "#252932",
        color: "#D9D9D9", // Change this to your desired hover text color
      },
      w: "100%",
      fontSize: "sm",
    },
    largePrimary: {
      bg: "#DC585B",
      color: "#D9D9D9",
      borderRadius: "15px",
      _hover: {
        opacity: "0.8",
      },
      _active: {
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
      px: "18px",
      fontSize: "sm",
    },
    largeSecondary: {
      bg: "#D9D9D9",
      color: "#DC585B",
      borderRadius: "15px",
      _hover: {
        opacity: "0.8",
      },
      _active: {
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
      fontSize: "sm",
      px: "18px",
    },
    menuItemImportant: {
      display: "flex",
      justifyContent: "start",
      color: "#DC585B",
      w: "100%",
      h: "100%",
      px: "10px",
      py: "6px",
      _hover: {},
    },
    menuItem: {
      display: "flex",
      justifyContent: "start",
      color: "#5B6171",
      w: "100%",
      h: "100%",
      px: "10px",
      py: "6px",
      _hover: {},
    },
    modalIcon: {
      w:'auto',
      h:'auto',
      px:2,
      py:2,
      border:'none',
      bg:'transparent',
      _hover:{}
      },
    modal: {
      _hover: { bg: "#252932" },
      color: "#5B6171",
      w: "99%",
      fontSize: "xs",
    },
    modalCancel: {
      color: "#5B6171",
      fontSize: "sm",
      bg: "#1D222C",
      px: "15px",
      py: "5px",
      borderRadius: "10px",
      hover: {
        opacity: "0.8",
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    glass: {
      bg:'#5B6171',
      color:'#1D222C',
      borderRadius:'15px',
      border:'none',
      px:'10px',
      py:'5px',
      opacity:'0.5',
      fontSize:'sm',
      _hover:{
        opacity:'0.8',
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    icon: {
      borderRadius: "50px",
      px: "0px",
      color: "#5B6171",
      _hover: {
        color: "#D9D9D9", // Change this to your desired hover text color
      },
      _active: {
        color: "#D9D9D9", // Change this to your desired hover text color
        transform: "scale(1.1)", // Increase the scale to make it grow
      },
    },
    field: {
      background: "transparent",
      color: "#5B6171",
      px: "0px",
      margin: "0px",
      fontFamily: "visbyRound",
      _hover: {
        borderRadius: "15px",
        bg: "#5B6171",
        color: "#1D222C",
      },
      // _active: {
      //   transform: "scale(1.03)"
      // }
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  // defaultProps: {
  //   size: "",
  //   variant: "primary",
  //   colorScheme: "",
  // },
};

const CheckboxStyle: ComponentStyleConfig = {
  variants: {
    default: {
      control: {
        width: "15px",
        height: "15px",
        color: "#F5F5F5",
        bg: "#1D222C",
        border: "0px",
        _active: {
          color: "#F5F5F5",
          bg: "#DC585B",
        },
        _checked: {
          border: "0px",
          color: "#F5F5F5",
          bg: "#DC585B",
          _hover: {
            color: "#F5F5F5",
            bg: "#DC585B",
          },
        },
        _hover: {
          color: "#F5F5F5",
          bg: "#252932",
        },
      },
      icon: {
        fontSize: "12px",
      },
    },
  },
};

const TabsStyle: ComponentStyleConfig = {
  variants: {
    default: {
      tablist: {
        fontFamily: "visbyRound",
        p: "2px",
        bg: "#1D222C",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
      },
      tab: {
        fontWeight: "semibold",
        borderRadius: "13px",
        color: "#5B6171",
        bg: "#1D222C",
        py: "8px",
        _selected: {
          bg: "#5B6171",
          color: "#1D222C",
        },
      },
      tabpanel: {
        fontFamily: "visbyRound",
        display: "flex",
        justifyContent: "center",
        w: "100%",
      },
    },
  },
};
const InputStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    default: {
      field: {
        fontFamily: "visbyRound",
        backgroundColor: "#1D222C",
        marginBottom: "3px",
        borderRadius: "15px",
        color: "#5B6171",
        fontSize: "18px",
        textAlign: "center",
        "&::placeholder": {
          textAlign: "center",
          color: "#5B6171",
          fontSize: "18px",
          fontSizeAdjust: "15px",
          opacity: "0.5",
          fontFamily: "visbyRound",
        },
        _focus: {
          boxShadow: "3px 4px 5px 0px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    secondary: {
      field: {
        fontFamily: "visbyRound",
        backgroundColor: "#252932",
        marginBottom: "3px",
        borderRadius: "15px",
        color: "#5B6171",
        fontSize: "18px",
        textAlign: "center",
        "&::placeholder": {
          textAlign: "center",
          color: "#5B6171",
          fontSize: "18px",
          fontSizeAdjust: "15px",
          opacity: "0.5",
          fontFamily: "visbyRound",
        },
        _focus: {
          boxShadow: "3px 4px 5px 0px rgba(0, 0, 0, 0.12)",
        },
      },
    },
  },

  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    // size: "",
    // variant: "",
    // colorScheme: "",
    // focusBorderColor: "primary",
  },
};

const theme = extendTheme({
  breakpoints: {
    // Define your custom breakpoint here
    xl: "1440px", // Adjust the value as needed
    vl: "1620px",
  },
  config,
  styles: {
    global: {
      body: {
        bg: "#252932",
        mx: "auto",
      },
    },
  },
  colors: {
    primaryDark: "#252932",
    secondDark: "#DC585B",
    thirdDark: "#F5F5F5",
    forthDark: "#5B6171",
  },
  components: {
    Input: InputStyle,
    Button: ButtonStyle,
    Tabs: TabsStyle,
    Progress: ProgressStyle,
    Checkbox: CheckboxStyle,
    Modal: ModalStyle,
  },
  fonts: {
    visbyRound: "visbyRound, sans-serif",
  },
});

export default theme;
