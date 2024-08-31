// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import data from './Data.json'; // Import Data.json

const initialState = {
  categories: data.categories, // Include categories from Data.json
  quizzes: data.categories.map(category => ({
    id: category.id,
    name: category.name,
    questions: category.questions
  })), // Transform categories into quizzes
  responses: {},
  searchTerm: '',
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
      const { quizId, responses } = action.payload;
      state.responses[quizId] = responses;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addQuiz, updateQuiz, addResponse ,addCategory} = widgetsSlice.actions;

export const store = configureStore({
  reducer: {
    widgets: widgetsSlice.reducer,
  },
});