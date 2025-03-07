// функціонал отримання інформації про поточного користувача
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/auth/operations";
import { selectUser, selectIsRefreshing  } from '../../redux/auth/selectors';
import { Rings } from "react-loader-spinner";
import styles from "./UserPanel.module.css";
import UserBar from '../UserBar/UserBar';
const UserPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Rings visible={true} height="60" width="60" color="#9BE1A0" />
      </div>
    );
  }

  if (!user) {
    return <p>No user data</p>;
  }

  const userName = user.name ? user.name : user.email.split("@")[0];

  const userPhoto = user.avatar
  ? user.avatar
  : `https://www.gravatar.com/avatar/${user.email}?d=identicon`;

  return (
    <div className={styles.userPanelCont}>
      <h2 className={styles.title}>
        Hello, <span className={styles.span}>{userName}!</span>
      </h2>
      <UserBar name={userName} avatar={userPhoto} />
    </div>
  );
};

export default UserPanel;

