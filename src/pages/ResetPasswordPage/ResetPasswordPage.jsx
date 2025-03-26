import { useEffect, useState } from 'react';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import clsx from 'clsx';
import s from '../SignUpPage/SignUpPage.module.css';
import ResetPasswordForm from '../../components/ResetPasswotrd/ResetPasswordForm.jsx';

const ResetPasswordPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  return (
    <div className={clsx('container', s.authContainer)}>
      <ResetPasswordForm token={token} />
      {isLargeScreen && <AdvantagesSection />}
    </div>
  );
};

export default ResetPasswordPage;
