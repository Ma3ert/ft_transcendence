import { Checkbox, Icon } from "@chakra-ui/react";
interface CostumCheckBoxProps {
  isChecked: boolean;
  icon: any;
  action: () => void;
}
const CostumCheckBox: React.FC<CostumCheckBoxProps> = ({
  isChecked ,
  icon,
action  
}) => {
  return (
    <>
      {isChecked ? (
        <Icon
          as={icon}
          fontSize={"18px"}
          color={"#DC585B"}
          onClick={action}
        />
      ) : (
        <Checkbox
          variant="default"
          onChange={action}
        ></Checkbox>
      )}
    </>
  );
};


export default CostumCheckBox;