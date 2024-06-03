import { configureStore } from "@reduxjs/toolkit";
import nodeSlice from "./features/nodeSlice";

export const store = configureStore({
  reducer: {
    node: nodeSlice,
  },
});
