import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const patientsSlice = createSlice({
  name: "patients",
  initialState,

  reducers: {
    addPatient: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPatient } = patientsSlice.actions;

export default patientsSlice.reducer;