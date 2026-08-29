import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: "",
  category: "",
  search: "",
  date: "",
  type: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setType:(state,action)=>{
      state.type = action.payload;

    },
    clearFilter: (state) => {
      state.account = "";
      state.category = "";
      state.search = "";
      state.date = "";
      state.type = "";
    },
  },
});

export const { setAccount, setCategory, setDate, setSearch, setType,clearFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
