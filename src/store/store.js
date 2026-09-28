import { configureStore } from "@reduxjs/toolkit";
import doctorsReducer from "./doctorsSlice";
import patientsReducer from "./patientsSlice";
import appointmentsReducer from "./appointmentsSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
  },
});