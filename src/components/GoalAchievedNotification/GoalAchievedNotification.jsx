import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const GoalAchievedNotification = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [documentHeight, setDocumentHeight] = useState(
    document.documentElement.scrollHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setDocumentHeight(document.documentElement.scrollHeight);
    };
    const handleScroll = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Confetti
      width={windowWidth}
      height={documentHeight} // Використовуємо висоту всієї сторінки
      recycle={false}
      numberOfPieces={750}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        // overflow: hidden,
      }}
    />
  );
};

export default GoalAchievedNotification;
