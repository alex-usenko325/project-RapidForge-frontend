import { TourProvider } from '@reactour/tour';

import { useTranslation } from 'react-i18next';
import { tourStepsStyles, disableBody, enableBody } from './TourStepsStyles.js';

const TourSteps = ({ children, onClose }) => {
  const { t } = useTranslation();

  const steps = [
    {
      content: (
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{ marginBottom: '10px', fontWeight: 700, fontSize: '18px' }}
          >
            {t('onboardingTour.welcome')}
          </h2>
        </div>
      ),
      position: 'center',
    },
    {
      selector: '.first-step',
      content: t('onboardingTour.first-step'),
    },
    {
      selector: '.second-step',
      content: t('onboardingTour.second-step'),
    },
    {
      selector: '.third-step',
      content: t('onboardingTour.third-step'),
    },
    {
      selector: '.fourth-step',
      content: t('onboardingTour.fourth-step'),
    },
    {
      selector: '.fifth-step',
      content: t('onboardingTour.fifth-step'),
    },
    {
      selector: '.sixth-step',
      content: t('onboardingTour.sixth-step'),
    },
    {
      selector: '.seventh-step',
      content: t('onboardingTour.seventh-step'),
    },
  ];

  const handleCloseTour = () => {
    localStorage.setItem('tourFinished', 'true');
    enableBody();
    if (onClose) {
      onClose(); // ← виклик переданого onClose з TrackerPage
    }
  };

  return (
    <TourProvider
      steps={steps}
      scrollSmooth
      disableInteraction={true}
      styles={tourStepsStyles}
      defaultOpen={true}
      badgeContent={({ totalSteps, currentStep }) =>
        currentStep + 1 + '/' + totalSteps
      }
      beforeClose={handleCloseTour}
      afterOpen={() => {
        disableBody();
      }}
    >
      {children}
    </TourProvider>
  );
};

export default TourSteps;
