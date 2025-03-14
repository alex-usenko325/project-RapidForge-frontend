import i18next from 'i18next';
import s from './LocalizationDropdownMenu.module.css';

const lngs = {
  en: { nativeName: 'EN' },
  ua: { nativeName: 'UA' },
};

const LocalizationDropdownMenu = () => {
    const changeLanguage = (event) => {
        const selectedLanguage = event.target.value;
        i18next.changeLanguage(selectedLanguage);
    };

    return (
        <div className={s.dropdownContainer}>
          <select
            id="language-select"
            className={s.dropdown}
            onChange={changeLanguage}
            defaultValue={i18next.language}
          >
            {Object.keys(lngs).map((lng) => (
              <option key={lng} value={lng}>
                {lngs[lng].nativeName}
              </option>
            ))}
          </select>
        </div>
   
      );
    };

    export default LocalizationDropdownMenu;