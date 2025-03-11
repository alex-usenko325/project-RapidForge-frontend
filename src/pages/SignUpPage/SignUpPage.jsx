import { useEffect, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import clsx from 'clsx';
import s from './SignUpPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalComponent } from '../../redux/modal/selectors';
import VerifyModal from '../../components/VerifyModal/VerifyModal';
import {
  closeModalAction,
  openModalAction,
} from '../../redux/modal/operations';

const SignUpPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalComponent = useSelector(selectModalComponent);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функція відкриття модалки після успішної реєстрації
  const handleSignUpSuccess = () => {
    openModalAction(dispatch, 'VerifyModal');
  };

  const handleCloseModal = () => {
    closeModalAction(dispatch);
  };

  return (
    <div className={clsx('container', s.authContainer)}>
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
      {isLargeScreen && <AdvantagesSection />}

      {modalComponent === 'VerifyModal' && (
        <VerifyModal onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SignUpPage;
