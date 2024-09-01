import { configureStore, createSlice } from '@reduxjs/toolkit';
import data from './Data.json'; // Import Data.json

const initialState = {
  categories: data.categories, // Include categories from Data.json
  quizzes: data.categories.map(category => ({
    id: category.id, // Generate a unique ID for each quiz
    name: category.name,
    questions: category.questions
  })), // Transform categories into quizzes
  responses: {},
  results: [], // Initialize results as an empty array
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
    },
    updateQuiz: (state, action) => {
      const index = state.quizzes.findIndex(quiz => quiz.id === action.payload.id);
      if (index !== -1) {
        state.quizzes[index] = action.payload;
      }
    },
    addResponse: (state, action) => {
      state.responses[action.payload.quizId] = action.payload.responses;
    },
    addResult: (state, action) => {
      state.results.push(action.payload);
    },
  },
});

export const { addQuiz, updateQuiz, addResponse, addResult } = widgetsSlice.actions;

const store = configureStore({
  reducer: {
    widgets: widgetsSlice.reducer,
  },
});

export default store;