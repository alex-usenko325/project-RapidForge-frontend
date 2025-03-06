// функціонал отримання інформації про поточного користувача
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/auth/operations";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <header>
      {isLoading && <p>Loading...</p>}
      {user ? <p>Hello, {user.email.split("@")[0]}</p> : <p>No user data</p>}
    </header>
  );
};

export default Header;
// умови для того щоб цей код працював:
// Файл operations.js містить getUserData()
// slice.js обробляє getUserData.fulfilled і зберігає дані користувача
// Redux store підключає user reducer
