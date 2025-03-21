import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const GoalAchievedNotification = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [documentHeight, setDocumentHeight] = useState(
    document.documentElement.scrollHeight
  );

  // Для отримання актуальних розмірів вікна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight); // Оновлення висоти документа
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Повертаємо Confetti лише для висоти, більші за певний поріг, щоб він не обривався
  const confettiHeight =
    windowHeight > documentHeight ? documentHeight : windowHeight;

  return (
    <>
      <Confetti
        width={windowWidth}
        height={confettiHeight} // Використовуємо висоту документа, якщо вона більша
        recycle={false}
        numberOfPieces={750}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}
      />
    </>
  );
};

export default GoalAchievedNotification;
