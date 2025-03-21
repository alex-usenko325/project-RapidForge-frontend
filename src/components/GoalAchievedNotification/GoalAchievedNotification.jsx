import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const GoalAchievedNotification = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Для отримання актуальних розмірів вікна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Confetti
        width={windowWidth}
        height={windowHeight}
        recycle={false}
        numberOfPieces={750}
      />
    </>
  );
};

export default GoalAchievedNotification;
