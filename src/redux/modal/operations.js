import { closeModal, openModal } from './slice';

export const openModalAction = (dispatch, component) => {
  dispatch(openModal(component));
};

export const closeModalAction = dispatch => {
  dispatch(closeModal());
};
