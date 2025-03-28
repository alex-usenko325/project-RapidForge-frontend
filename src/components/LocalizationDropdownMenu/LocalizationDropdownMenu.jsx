import i18next from 'i18next';
import s from './LocalizationDropdownMenu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from '../../redux/user/selectors';
import { changeLanguage } from '../../redux/user/slice';
import { useEffect } from 'react';

const lngs = {
  en: { nativeName: 'EN' },
  ua: { nativeName: 'UA' },
};

const LocalizationDropdownMenu = () => {
  const selectedLanguage = useSelector(selectLanguage);
  const dispatch = useDispatch();

  useEffect(() => {
    // Якщо мова в Redux змінюється, оновлюємо i18next
    if (selectedLanguage) {
      i18next.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);

  const onChangeLanguage = event => {
    const newLanguage = event.target.value;
    dispatch(changeLanguage(newLanguage));
    i18next.changeLanguage(newLanguage);
  };

  return (
    <div className={s.dropdownContainer}>
      <select
        id="language-select"
        className={s.dropdown}
        onChange={onChangeLanguage}
        value={selectedLanguage}
      >
        {Object.keys(lngs).map(lng => (
          <option key={lng} value={lng}>
            {lngs[lng].nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocalizationDropdownMenu;
