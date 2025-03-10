import s from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <Link to="/">
        <button className={s.btn}>Back to Home Page</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
