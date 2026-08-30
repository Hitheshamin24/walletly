import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("walletlyCurrentUser");
    return stored ? JSON.parse(stored)?.id : null;
  } catch {
    return null;
  }
};

const getStoredGoals = () => {
  try {
    const stored = localStorage.getItem(`walletly-goals-${getInitialUser()}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const persist = (goals) => {
  localStorage.setItem(
    `walletly-goals-${getInitialUser()}`,
    JSON.stringify(goals),
  );
};

const initialState = {
  goals: getStoredGoals(),
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
      persist(state.goals);
    },
    updateGoal: (state, action) => {
      const idx = state.goals.findIndex((g) => g.id === action.payload.id);
      if (idx !== -1) {
        state.goals[idx] = action.payload;
        persist(state.goals);
      }
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload);
      persist(state.goals);
    },
    addContribution: (state, action) => {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal) {
        goal.savedAmount = (Number(goal.savedAmount) || 0) + Number(action.payload.amount);
        goal.contributions = goal.contributions || [];
        goal.contributions.unshift({
          note: action.payload.note || "Contribution",
          date: action.payload.date,
          amount: Number(action.payload.amount),
        });
        persist(state.goals);
      }
    },
  },
});

export const { addGoal, updateGoal, removeGoal, addContribution } = goalSlice.actions;
export default goalSlice.reducer;
