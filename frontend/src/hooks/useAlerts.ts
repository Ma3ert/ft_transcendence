import { UseToastOptions } from "@chakra-ui/react";

export interface UseAlertsProps {
  position: string;
  duration: number;
  description: string;
  status: string;
}
export const useSuccess = () => {
  return (description: string) => {
    const attr: UseToastOptions = {
      position: "top-right",
      duration: 1000,
      description: description,
      status: "success",
    };
    return attr;
  };
};

export const useFailure = () => {
 
    return (description: string) => {
      const attr: UseToastOptions = {
        position: "top-right",
        duration: 1000,
        description: description,
        status: "error",
      };
      return attr;
    }
};
