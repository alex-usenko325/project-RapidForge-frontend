import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

const Layout = ({ children }) => {
  return (
    <div>
      <Toaster />
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
