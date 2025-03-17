import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWaterRecords } from '../../../redux/water/operations';
import {
  selectWaterProgress,
  selectWaterIsLoading,
} from '../../../redux/water/selectors';
import css from './WaterProgressBar.module.css';
import { useTranslation } from 'react-i18next';

export default function WaterProgressBar() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const progress = useSelector(selectWaterProgress);
  const isLoading = useSelector(selectWaterIsLoading);

  useEffect(() => {
    dispatch(getWaterRecords());
  }, [dispatch]);

  const fixedLabels = [0, 50, 100];
  const isFixedLabel = fixedLabels.includes(Math.round(progress));

  if (isLoading)
    return (
      <div className={css.container} data-tour="step-4">
        <p className={css.label}>{t('waterProgressBar.today')}</p>
        <div className={css.loaderContainer}>
          <div className={css.loader}></div>
        </div>
      </div>
    );

  return (
    <div className={css.container} data-tour="step-2">
      <p className={css.label}>{t('waterProgressBar.today')}</p>
      <div className={css.progressBar}>
        <div
          className={css.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className={css.progressMarker}
          style={{ left: `${progress}%` }}
        ></div>
      </div>
      <div className={css.progressLabels}>
        {fixedLabels.map(value => (
          <span
            key={value}
            className={`${css.progressSpan} ${
              progress === value ? css.active : ''
            }`}
            style={{
              position: 'absolute',
              left: value === 0 ? '2%' : value === 100 ? '95%' : `${value}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {value}%
          </span>
        ))}
        {!isFixedLabel && (
          <span
            className={`${css.progressSpan} ${css.dynamic}`}
            style={{
              position: 'absolute',
              left: `${progress}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {Math.round(progress)}%
          </span>
        )}
      </div>
    </div>
  );
}
