import { useState, useEffect } from 'react';
import { Progress } from '@chakra-ui/react';

interface TimerComponentProps {
    bg?: string;
}
const  TimerComponent:React.FC<TimerComponentProps> = ({bg})=> {
  const [timer, setTimer] = useState(15);
  const [progress, setProgress] = useState(100);
  const progressBarInterval = 1000; // 1000ms = 1 second
  const maxProgressValue = 15; // 100% progress

  // Update the progress value at regular intervals
  const updateProgress = () => {
      setTimer(timer  - 1);
      console.log(timer);
      setProgress((timer / maxProgressValue) * 100);
  };

  // Start the timer when the component mounts
  useEffect(() => {
    const intervalId = setInterval(updateProgress, progressBarInterval);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  return (
      <Progress bg={bg} borderRadius={'full'} value={progress} size="sm" colorScheme="brand" />
  );
}

export default TimerComponent;
