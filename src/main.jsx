import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { CssBaseline, CircularProgress } from '@mui/material';
import './index.css';
import 'modern-normalize';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <App />
      </PersistGate>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  </Provider>
);
