import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { component: null },
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
