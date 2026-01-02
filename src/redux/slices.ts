import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type wordType = {
  word: string;
  meaning: string;
  options: string[];
};

type stateType = {
  loading: boolean;
  result: string[];
  error?: string;
  words: wordType[];
};

const initialState: stateType = {
  loading: false,
  result: [],
  words: [],
};

const rootSlice = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    getWordsSuccess: (state, action: PayloadAction<wordType[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.result = action.payload;
    },
    clearState: (state) => {
      state.loading = false;
      state.result = [];
      state.error = undefined;
      state.words = [];
    },
  },
});

export const {
  getWordsRequest,
  getWordsSuccess,
  getWordsFail,
  saveResult,
  clearState,
} = rootSlice.actions;

export default rootSlice.reducer;
