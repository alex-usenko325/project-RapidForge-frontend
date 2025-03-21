import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../redux/auth/operations';
import { GoogleLogin } from '@react-oauth/google';

export const GoogleAuthButton = () => {
  const dispatch = useDispatch();

  // Обробка успішної авторизації
  const handleLogin = response => {
    if (response.credential) {
      dispatch(loginWithGoogle(response.credential)); // Відправка отриманого токену на сервер
      console.log(response); // Лог для дебагу
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin} // Успішна авторизація
      onError={() => console.log('Login Failed')} // Помилка авторизації
    />
  );
};
