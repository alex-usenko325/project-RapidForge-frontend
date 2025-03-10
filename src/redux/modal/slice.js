import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  component: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.component = action.payload;
    },
    closeModal: state => {
      state.component = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
