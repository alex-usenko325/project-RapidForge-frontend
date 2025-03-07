import css from './WaterProgressBar.module.css';

export default function WaterProgressBar({ progress = 50 }) {
  return (
    <div className={css.container}>
      <p className={css.label}>Today</p>
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
        <span className={css.progressSpan}>0%</span>
        <span className={css.progressSpan}>50%</span>
        <span className={css.progressSpan}>100%</span>
      </div>
    </div>
  );
}
