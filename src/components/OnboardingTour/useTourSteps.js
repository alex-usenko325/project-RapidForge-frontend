import { useTranslation } from 'react-i18next';

const useTourSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      selector: '[data-tour="step-1"]',
      content: t('onboardingTour.first-step'),
    },
    {
      selector: '[data-tour="step-2"]',
      content: t('onboardingTour.second-step'),
    },
    {
      selector: '[data-tour="step-3"]',
      content: t('onboardingTour.third-step'),
    },
    {
      selector: '[data-tour="step-4"]',
      content: t('onboardingTour.fourth-step'),
    },
    {
      selector: '[data-tour="step-5"]',
      content: t('onboardingTour.fifth-step'),
    },
    {
      selector: '[data-tour="step-6"]',
      content: t('onboardingTour.sixth-step'),
    },
    {
      selector: '[data-tour="step-7"]',
      content: t('onboardingTour.seventh-step'),
    },
    {
      selector: '[data-tour="step-8"]',
      content: t('onboardingTour.eighth-step'),
    },
    {
      selector: '[data-tour="step-9"]',
      content: t('onboardingTour.ninth-step'),
    },
  ];

  return steps;
};

export default useTourSteps;

//  import { useTranslation } from 'react-i18next';

// const TourSteps = () => {
//   const { t } = useTranslation();

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
//     {
//       selector: '[data-tour="step-9"]',
//       content: 'We hope you enjoy using AquaTrack!',
//     },
//   ];

//   return steps;
// };

// export default TourSteps;

// const steps = [
//   {
//     selector: '[data-tour="step-1"]',
//     content: 'Welcome to AquaTrack!',
//   },
//   {
//     selector: '[data-tour="step-2"]',
//     content: 'This is your personal water tracker.',
//   },
//   {
//     selector: '[data-tour="step-3"]',
//     content: 'Here is your daily water consumption goal.',
//   },
//   {
//     selector: '[data-tour="step-4"]',
//     content: 'This is your progress indicator.',
//   },
//   {
//     selector: '[data-tour="step-5"]',
//     content: 'Click here to add more water.',
//   },
//   {
//     selector: '[data-tour="step-6"]',
//     content:
//       'Here you can add your personal data and record your water consumption.',
//   },
//   {
//     selector: '[data-tour="step-7"]',
//     content: 'This section shows your water intake for the day.',
//   },
//   {
//     selector: '[data-tour="step-8"]',
//     content: 'Here you will see statistics for each day of the month.',
//   },
//   {
//     selector: '[data-tour="step-9"]',
//     content: 'We hope you enjoy using AquaTrack!',
//   },
// ];

// export default steps;

// tourSteps.js
// import { useTranslation } from 'react-i18next';

// const useTourSteps = () => {
//   const { t } = useTranslation();

// const steps = [
//   {
//     selector: '[data-tour="step-1"]',
//     content: t('onboardingTour.first-step'),
//   },
//   {
//     selector: '[data-tour="step-2"]',
//     content: t('onboardingTour.second-step'),
//   },
//   {
//     selector: '[data-tour="step-3"]',
//     content: t('onboardingTour.third-step'),
//   },
//   {
//     selector: '[data-tour="step-4"]',
//     content: t('onboardingTour.fourth-step'),
//   },
//   {
//     selector: '[data-tour="step-5"]',
//     content: t('onboardingTour.fifth-step'),
//   },
//   {
//     selector: '[data-tour="step-6"]',
//     content: t('onboardingTour.sixth-step'),
//   },
//   {
//     selector: '[data-tour="step-7"]',
//     content: t('onboardingTour.seventh-step'),
//   },
//   {
//     selector: '[data-tour="step-8"]',
//     content: t('onboardingTour.eighth-step'),
//   },
//   {
//     selector: '[data-tour="step-9"]',
//     content: t('onboardingTour.ninth-step'),
//   },
// ];

// // return steps;

// export default steps;
// const steps = [
//   {
//     selector: '[data-tour="step-1"]',
//     content: 'Welcome to AquaTrack!',
//   },
//   {
//     selector: '[data-tour="step-2"]',
//     content: 'This is your personal water tracker.',
//   },
//   {
//     selector: '[data-tour="step-3"]',
//     content: 'Here is your daily water consumption goal.',
//   },
//   {
//     selector: '[data-tour="step-4"]',
//     content: 'This is your progress indicator.',
//   },
//   {
//     selector: '[data-tour="step-5"]',
//     content: 'Click here to add more water.',
//   },
//   {
//     selector: '[data-tour="step-6"]',
//     content:
//       'Here you can add your personal data and record your water consumption.',
//   },
//   {
//     selector: '[data-tour="step-7"]',
//     content: 'This section shows your water intake for the day.',
//   },
//   {
//     selector: '[data-tour="step-8"]',
//     content: 'Here you will see statistics for each day of the month.',
//   },
//   {
//     selector: '[data-tour="step-9"]',
//     content: 'We hope you enjoy using AquaTrack!',
//   },
// ];

// export default steps;
