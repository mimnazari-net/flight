"use client"
import { configureStore } from "@reduxjs/toolkit";
import flightSlice from "./flightSlice";

export function makeStore(){
  return configureStore({
    reducer:{
      flightSlice: flightSlice,
    }
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
