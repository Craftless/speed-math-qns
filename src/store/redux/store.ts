import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./leaderboard-slice";
import statsReducer from "./stats-slice";

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    leaderboard: leaderboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
