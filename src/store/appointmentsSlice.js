import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const appointmentsSlice = createSlice({
  name: "appointments",

  initialState,

  reducers: {
    addAppointment: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        status: "Scheduled",
      });
    },

    updateAppointment: (state, action) => {
      const index = state.findIndex(
        (appointment) => appointment.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      }
    },

    updateStatus: (state, action) => {
      const appointment = state.find(
        (appointment) => appointment.id === action.payload.id
      );

      if (appointment) {
        appointment.status = action.payload.status;
      }
    },

    deleteAppointment: (state, action) => {
      return state.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
  },
});

export const {
  addAppointment,
  updateAppointment,
  updateStatus,
  deleteAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;