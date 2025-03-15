import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from './Loader/Loader';

const Layout = ({ children }) => {
  return (
    <div>
      <Toaster />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
