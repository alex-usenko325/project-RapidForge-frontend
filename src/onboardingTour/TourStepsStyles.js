import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const disableBody = () => {
  disableBodyScroll(document.body);
};

export const enableBody = () => {
  enableBodyScroll(document.body);
};

export const tourStepsStyles = {
  popover: base => ({
    ...base,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  }),
  dot: (base, state) => ({
    ...base,
    backgroundColor: state.current ? '#9be1a0' : '#ccc',
  }),
  arrow: base => ({
    ...base,
    color: '#323f47',
  }),
  close: base => ({
    ...base,
    color: '#9be1a0',
    position: 'absolute',
    top: '10px',
    right: '10px',
  }),
  badge: base => ({
    ...base,
    backgroundColor: '#4caf50',
    color: '#fff',
  }),
};
