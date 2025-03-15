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

  const visibleFixedLabels = fixedLabels.filter(label => {
    const distance = Math.abs(progress - label);
    return distance > 15 || distance === 0;
  });

  if (isLoading) return <p>{t('waterProgressBar.loading')}</p>;

  return (
    <div className={css.container}>
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
        {visibleFixedLabels.map(value => (
          <span
            key={value}
            className={`${css.progressSpan} ${
              progress === value ? css.active : ''
            }`}
            style={{
              position: 'absolute',
              left: `${value}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {value}%
          </span>
        ))}
        {!isFixedLabel && (
          <span
            className={`${css.progressSpan} ${css.active}`}
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
