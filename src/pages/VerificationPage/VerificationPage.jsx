import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import SendVerification from '../../components/SendVerificationEmail/SendVerificationEmail.jsx'; // Імпорт для відправки email
import s from './VerificationPage.module.css';
import { useState, useEffect } from 'react';
import VerifyEmail from '../../components/VerifyEmail/VerifyEmail.jsx';

const VerificatePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status'); // Перевіряємо статус із параметрів URL

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);

  // Отримуємо email з параметрів URL або динамічно з іншого джерела
  const email = searchParams.get('email'); // email може бути передано в URL
  const token = searchParams.get('token'); // Токен для верифікації

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={clsx('container', s.authContainer)}>
      <div className={clsx(s.contentWrapper)}>
        {status === 'success' ? (
          <h1 className={clsx(s.success, s.message)}>
            Ваша пошта успішно верифікована! 🎉
          </h1>
        ) : (
          <h1 className={clsx(s.info, s.message)}>
            Будь ласка, перевірте вашу пошту для завершення верифікації.
          </h1>
        )}
      </div>

      {/* Відправляємо верифікаційний лист, якщо email є і верифікація ще не пройдена */}
      {email && status !== 'success' && !token && (
        <SendVerification email={email} />
      )}

      {/* Компонент для верифікації токену */}
      {token && <VerifyEmail />}

      {isLargeScreen && <AdvantagesSection />}
    </div>
  );
};

export default VerificatePage;
