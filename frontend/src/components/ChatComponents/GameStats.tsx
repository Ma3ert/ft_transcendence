import { Stack, Text, Icon, HStack } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { IoStatsChart } from "react-icons/io5";

Chart.register(CategoryScale);

interface Props {}

const GameStats: React.FC<Props> = ({}) => {
  const data = {
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <Stack
      w="100%"
      h="100%"
      justifyContent={"center"}
      alignItems={"center"}
      maxW={{ sm: "450px", md: "550px", lg: "600px", xl: "900px" }}
      minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
      spacing={5}
    >
      <HStack spacing={3} justifyContent={"center"} alignItems={"center"}>
        <Icon as={IoStatsChart} fontSize="md" color={"#5B6171"} />
        <Text fontFamily="visbyRound" fontSize={"md"} color={"#5B6171"}>
          Your game stats
        </Text>
      </HStack>
      <Line
        data={{
          // x-axis label values
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Games played",
              // y-axis data plotting values
              data: [12, 1, 25, 4, 44, 18, 9],
              fill: false,
              borderWidth: 2,
              backgroundColor: "#DC585B",
              borderColor: "#DC585B",
            },
            {
              label: "Games Lost",
              // y-axis data plotting values
              data: [22, 19, 12, 14, 7, 3, 2],
              fill: false,
              borderWidth: 2,
              backgroundColor: "#D9D9D9",
              borderColor: "#D9D9D9",
            },
            {
              label: "Games Won",
              // y-axis data plotting values
              data: [2, 21, 5, 44, 4, 1, 15],
              fill: false,
              borderWidth: 2,
              backgroundColor: "#5B6171",
              borderColor: "#5B6171",
            },
          ],
        }}
      />
    </Stack>
  );
};

export default GameStats;
