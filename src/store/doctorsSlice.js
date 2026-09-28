import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Dr. Sharma",
    department: "Cardiology",
  },
  {
    id: 2,
    name: "Dr. Mehta",
    department: "Dermatology",
  },
  {
    id: 3,
    name: "Dr. Singh",
    department: "General Medicine",
  },
];

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
});

export default doctorsSlice.reducer;