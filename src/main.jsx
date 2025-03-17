import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import App from './App.jsx';
import './index.css';
import 'modern-normalize';
import './i18next.js';

// import { TourProvider } from '@reactour/tour'; // Імпортуємо бібліотеку для туру
// import { tourStyles } from './tourStyles'; // Імпортуємо стилі для туру
// import useTourSteps from './components/OnboardingTour/useTourSteps.js';
import OnboardingTour from './components/OnboardingTour/OnboardingTour.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        {/* <TourProvider steps={useTourSteps} styles={tourStyles}> */}

        <OnboardingTour />
        <App />
        {/* </OnboardingTour> */}

        {/* </TourProvider> */}
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
