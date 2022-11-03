import { createSlice } from "@reduxjs/toolkit";

const initial = {
  totalUsers: null as number | null,
  globalTGP: null as number | null,
  personalTGP: null as number | null,
  totalScore: null as number | null,
  totalCorrect: null as number | null,
  totalWrong: null as number | null,
  totalSkipped: null as number | null,
  hasData: false,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: initial,
  reducers: {
    setTotalUsers(state, action: { payload: { totalUsers: number } }) {
      state.totalUsers = action.payload.totalUsers;
      state.hasData = true;
    },
    setGlobalTGP(state, action: { payload: { globalTGP: number } }) {
      state.globalTGP = action.payload.globalTGP;
      state.hasData = true;
    },
    setPersonalTGP(state, action: { payload: { personalTGP: number } }) {
      state.personalTGP = action.payload.personalTGP;
      state.hasData = true;
    },
    setTotalScore(state, action: { payload: { totalScore: number } }) {
      state.totalScore = action.payload.totalScore;
      state.hasData = true;
    },
    setTotalCorrect(state, action: { payload: { totalCorrect: number } }) {
      state.totalCorrect = action.payload.totalCorrect;
      state.hasData = true;
    },
    setTotalWrong(state, action: { payload: { totalWrong: number } }) {
      state.totalWrong = action.payload.totalWrong;
      state.hasData = true;
    },
    setTotalSkipped(state, action: { payload: { totalSkipped: number } }) {
      state.totalSkipped = action.payload.totalSkipped;
      state.hasData = true;
    },
    reset(state, action) {
      state.totalUsers = initial.totalUsers;
      state.globalTGP = initial.globalTGP;
      state.hasData = false;
    },
  },
});

export const setTotalUsers = leaderboardSlice.actions.setTotalUsers;
export const setGlobalTGP = leaderboardSlice.actions.setGlobalTGP;
export const setPersonalTGP = leaderboardSlice.actions.setPersonalTGP;
export const setTotalScore = leaderboardSlice.actions.setTotalScore;
export const setTotalCorrect = leaderboardSlice.actions.setTotalCorrect;
export const setTotalWrong = leaderboardSlice.actions.setTotalWrong;
export const setTotalSkipped = leaderboardSlice.actions.setTotalSkipped;
export const reset = leaderboardSlice.actions.reset;
export default leaderboardSlice.reducer;
