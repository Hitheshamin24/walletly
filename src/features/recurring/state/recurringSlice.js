import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("walletlyCurrentUser");
    return stored ? JSON.parse(stored)?.id : null;
  } catch {
    return null;
  }
};

const getStoredRecurring = () => {
  try {
    const stored = localStorage.getItem(`walletly-recurring-${getInitialUser()}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const persist = (items) => {
  localStorage.setItem(
    `walletly-recurring-${getInitialUser()}`,
    JSON.stringify(items),
  );
};

const initialState = {
  recurringItems: getStoredRecurring(),
};

const recurringSlice = createSlice({
  name: "recurring",
  initialState,
  reducers: {
    addRecurring: (state, action) => {
      state.recurringItems.push(action.payload);
      persist(state.recurringItems);
    },
    updateRecurring: (state, action) => {
      const idx = state.recurringItems.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) {
        state.recurringItems[idx] = action.payload;
        persist(state.recurringItems);
      }
    },
    removeRecurring: (state, action) => {
      state.recurringItems = state.recurringItems.filter((r) => r.id !== action.payload);
      persist(state.recurringItems);
    },
    togglePause: (state, action) => {
      const item = state.recurringItems.find((r) => r.id === action.payload);
      if (item) {
        item.paused = !item.paused;
        persist(state.recurringItems);
      }
    },
  },
});

export const { addRecurring, updateRecurring, removeRecurring, togglePause } =
  recurringSlice.actions;
export default recurringSlice.reducer;
