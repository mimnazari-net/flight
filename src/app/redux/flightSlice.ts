"use client";
import { createSlice } from "@reduxjs/toolkit";
import { log } from "console";
import { stat } from "fs";

interface initialStateType {
  countAdult: number;
  countChild: number;
  countIntat: number;
  filledInfo: boolean;
}

const initialState: initialStateType = {
  countAdult: 1,
  countChild: 0,
  countIntat: 0,
  filledInfo: false,
};
const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    adult: (
      state,
      { payload }: { payload: { fun: "+" | "-"; type: string } }
    ) => {
      if (payload.type === "adult") {
        if (payload.fun === "-") {
          state.countAdult = state.countAdult - 1;
        } else {
          state.countAdult = state.countAdult + 1;
        }
      } else if (payload.type === "child") {
        if (payload.fun === "-") {
          state.countChild = state.countChild - 1;
        } else {
          state.countChild = state.countChild + 1;
        }
      } else if (payload.type === "infat") {
        if (payload.fun === "-") {
          state.countIntat = state.countIntat - 1;
        } else {
          state.countIntat = state.countIntat + 1;
        }
      }
    },
    setFill: (state, { payload }: { payload: boolean }) => {
      state.filledInfo = payload;
    },
  },
});

export const { adult, setFill } = flightSlice.actions;
export default flightSlice.reducer;
