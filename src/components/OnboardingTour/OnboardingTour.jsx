import { useState, useEffect } from 'react';
import { TourProvider } from '@reactour/tour'; // Імпортуємо бібліотеку для туру
import useTourSteps from './useTourSteps'; // Імпортуємо кроки для туру
import { tourStyles } from './tourStyles'; // Імпортуємо стилі для туру
import { useTranslation } from 'react-i18next';

const OnboardingTour = () => {
  const [isTourOpen, setIsTourOpen] = useState(false); // Стейт для контролю запуску туру
  const { t } = useTranslation();
  const steps = useTourSteps();
  console.log('Steps: ', steps);

  // Автоматичний запуск туру при завантаженні сторінки
  useEffect(() => {
    setIsTourOpen(true);
  }, [steps]);

  const startTour = () => {
    console.log('Tour is opening...');
    setIsTourOpen(true); // Відкриваємо тур
  };

  return (
    <TourProvider
      steps={steps} // Передаємо кроки туру
      isOpen={isTourOpen} // Відкриваємо тур
      onRequestClose={() => setIsTourOpen(false)} // Закриття туру
      styles={tourStyles} // Стилі для туру
    >
      <div>
        <button
          style={tourStyles.tourBtn}
          onClick={() => {
            console.log('Tour started!'); // Лог для перевірки
            startTour();
          }}
        >
          <span style={tourStyles.icon}></span>
          {t('onboardingTour.startTourBtn')}
        </button>
      </div>
    </TourProvider>
  );
};

export default OnboardingTour;

// import { useState, useEffect } from 'react';
// import { TourProvider } from '@reactour/tour'; // Імпортуємо бібліотеку для туру
// import { useTranslation } from 'react-i18next';
// import { tourStyles } from './tourStyles'; // Імпортуємо стилі для туру

// const OnboardingTour = () => {
//   const [isTourOpen, setIsTourOpen] = useState(false); // Стейт для контролю запуску туру
//   const { t } = useTranslation();

//   // Кроки для туру без використання useTourSteps
//   const steps = [
//     {
//       selector: '[data-tour="step-1"]',
//       content: t('onboardingTour.first-step'),
//     },
//     {
//       selector: '[data-tour="step-2"]',
//       content: t('onboardingTour.second-step'),
//     },
//     {
//       selector: '[data-tour="step-3"]',
//       content: t('onboardingTour.third-step'),
//     },
//     {
//       selector: '[data-tour="step-4"]',
//       content: t('onboardingTour.fourth-step'),
//     },
//     {
//       selector: '[data-tour="step-5"]',
//       content: t('onboardingTour.fifth-step'),
//     },
//     {
//       selector: '[data-tour="step-6"]',
//       content: t('onboardingTour.sixth-step'),
//     },
//     {
//       selector: '[data-tour="step-7"]',
//       content: t('onboardingTour.seventh-step'),
//     },
//     {
//       selector: '[data-tour="step-8"]',
//       content: t('onboardingTour.eighth-step'),
//     },
//   ];

//   // Автоматичний запуск туру при завантаженні сторінки
//   useEffect(() => {
//     setIsTourOpen(true);
//   }, []);

//   const startTour = () => {
//     console.log('Tour is opening...');
//     setIsTourOpen(true); // Відкриваємо тур
//   };

//   return (
//     <TourProvider
//       steps={steps} // Передаємо кроки туру
//       isOpen={isTourOpen} // Відкриваємо тур
//       onRequestClose={() => setIsTourOpen(false)} // Закриття туру
//       styles={tourStyles} // Стилі для туру
//     >
//       <div>
//         <button
//           style={tourStyles.TourBtn}
//           onClick={() => {
//             console.log('Tour started!'); // Лог для перевірки
//             startTour();
//           }}
//         >
//           <span style={tourStyles.icon}></span>
//           {t('onboardingTour.startTourBtn')}
//         </button>
//       </div>
//     </TourProvider>
//   );
// };

// export default OnboardingTour;
// OnboardingTour.jsx

// import { useState, useEffect } from 'react';
// import { TourProvider } from '@reactour/tour'; // Імпортуємо бібліотеку для туру
// import { useTranslation } from 'react-i18next'; // Викликаємо useTranslation на верхньому рівні
// import { tourStyles } from './tourStyles'; // Імпортуємо стилі для туру

// const OnboardingTour = () => {
//   const { t } = useTranslation(); // Викликаємо хук на верхньому рівні
//   const [isTourOpen, setIsTourOpen] = useState(false); // Стейт для контролю запуску туру

//   // Кроки для туру
//   const steps = [
//     {
//       selector: '[data-tour="step-1"]',
//       content: t('onboardingTour.first-step'),
//     },
//     {
//       selector: '[data-tour="step-2"]',
//       content: t('onboardingTour.second-step'),
//     },
//     {
//       selector: '[data-tour="step-3"]',
//       content: t('onboardingTour.third-step'),
//     },
//     {
//       selector: '[data-tour="step-4"]',
//       content: t('onboardingTour.fourth-step'),
//     },
//     {
//       selector: '[data-tour="step-5"]',
//       content: t('onboardingTour.fifth-step'),
//     },
//     {
//       selector: '[data-tour="step-6"]',
//       content: t('onboardingTour.sixth-step'),
//     },
//     {
//       selector: '[data-tour="step-7"]',
//       content: t('onboardingTour.seventh-step'),
//     },
//     {
//       selector: '[data-tour="step-8"]',
//       content: t('onboardingTour.eighth-step'),
//     },
//   ];

//   // Автоматичний запуск туру при завантаженні сторінки
//   useEffect(() => {
//     setIsTourOpen(true);
//   }, []); // Тепер useEffect працює лише після першого рендеру, без виклику хуків

//   const startTour = () => {
//     setIsTourOpen(true); // Відкриваємо тур
//   };

//   return (
//     <TourProvider
//       steps={steps} // Передаємо кроки
//       isOpen={isTourOpen} // Відкриваємо тур
//       onRequestClose={() => setIsTourOpen(false)} // Закриття туру
//       styles={tourStyles} // Стилі для туру
//     >
//       <div>
//         <button
//           style={tourStyles.TourBtn}
//           onClick={() => {
//             console.log('Tour started!'); // Лог для перевірки
//             startTour();
//           }}
//         >
//           <span style={tourStyles.icon}></span>
//           {t('onboardingTour.startTourBtn')}
//         </button>
//       </div>
//     </TourProvider>
//   );
// };

// export default OnboardingTour;
// import { useState, useEffect } from 'react';
// import { TourProvider } from '@reactour/tour'; // Імпортуємо бібліотеку для туру
// import { useTranslation } from 'react-i18next';
// import { tourStyles } from './tourStyles'; // Імпортуємо стилі для туру

// const OnboardingTour = () => {
//   const [isTourOpen, setIsTourOpen] = useState(false); // Стейт для контролю запуску туру
//   const { t } = useTranslation();

//   // Кроки для туру без використання useTourSteps
//   const steps = [
//     {
//       selector: '[data-tour="step-1"]',
//       content: 'Welcome to AquaTrack!',
//     },
//     {
//       selector: '[data-tour="step-2"]',
//       content: 'This is your personal water tracker.',
//     },
//     {
//       selector: '[data-tour="step-3"]',
//       content: 'Here is your daily water consumption goal.',
//     },
//     {
//       selector: '[data-tour="step-4"]',
//       content: 'This is your progress indicator.',
//     },
//     {
//       selector: '[data-tour="step-5"]',
//       content: 'Click here to add more water.',
//     },
//     {
//       selector: '[data-tour="step-6"]',
//       content:
//         'Here you can add your personal data and record your water consumption.',
//     },
//     {
//       selector: '[data-tour="step-7"]',
//       content: 'This section shows your water intake for the day.',
//     },
//     {
//       selector: '[data-tour="step-8"]',
//       content: 'Here you will see statistics for each day of the month.',
//     },
//   ];

//   // Автоматичний запуск туру при завантаженні сторінки
//   useEffect(() => {
//     setIsTourOpen(true); // Відкриваємо тур після завантаження компонента
//   }, []);

//   const startTour = () => {
//     console.log('Tour is opening...');
//     setIsTourOpen(true); // Відкриваємо тур
//   };

//   return (
//     <TourProvider
//       steps={steps} // Передаємо кроки туру
//       isOpen={isTourOpen} // Відкриваємо тур
//       onRequestClose={() => setIsTourOpen(false)} // Закриття туру
//       styles={tourStyles} // Стилі для туру
//     >
//       <div>
//         <button
//           style={tourStyles.TourBtn}
//           onClick={() => {
//             console.log('Tour started!'); // Лог для перевірки
//             startTour();
//           }}
//         >
//           <span style={tourStyles.icon}></span>
//           {t('onboardingTour.startTourBtn')}{' '}
//           {/* Ваше текстове повідомлення для кнопки */}
//         </button>
//       </div>
//     </TourProvider>
//   );
// };

// export default OnboardingTour;
