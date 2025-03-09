// import css from './WaterProgressBar.module.css';

// export default function WaterProgressBar({ progress = 100 }) {
//   return (
//     <div className={css.container}>
//       <p className={css.label}>Today</p>
//       <div className={css.progressBar}>
//         <div
//           className={css.progressFill}
//           style={{ width: `${progress}%` }}
//         ></div>
//         <div
//           className={css.progressMarker}
//           style={{ left: `${progress}%` }}
//         ></div>
//       </div>
//       <div className={css.progressLabels}>
//         <span className={css.progressSpan}>0%</span>
//         <span className={css.progressSpan}>50%</span>
//         <span className={css.progressSpan}>100%</span>
//       </div>
//     </div>
//   );
// }

import css from './WaterProgressBar.module.css';

export default function WaterProgressBar({ progress = 100 }) {
  const fixedLabels = [0, 50, 100];
  const isFixedLabel = fixedLabels.includes(progress);

  const visibleFixedLabels = fixedLabels.filter(label => {
    const distance = Math.abs(progress - label);
    return distance > 15 || distance === 0;
  });

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
            {progress}%
          </span>
        )}
      </div>
    </div>
  );
}
