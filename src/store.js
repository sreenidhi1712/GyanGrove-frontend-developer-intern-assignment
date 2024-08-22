// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import data from "./Data.json"

const initialState = {
  categories: data,
  searchTerm: '',
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const category = action.payload;
      if (!state.categories[category]) {
        state.categories[category] = [];
      }
    },
    removeCategory: (state, action) => {
      const category = action.payload;
      delete state.categories[category];
    },
    addWidget: (state, action) => {
      const { category, widget } = action.payload;
      if (state.categories[category]) {
        state.categories[category].push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { category, widgetId } = action.payload;
      state.categories[category] = state.categories[category].filter(w => w.id !== widgetId);
    },
    uncheckWidget: (state, action) => {
      const { category, widgetId } = action.payload;
      state.categories[category] = state.categories[category].filter(w => w.id !== widgetId);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { addCategory, removeCategory, addWidget, removeWidget, uncheckWidget, setSearchTerm } = widgetsSlice.actions;

export const store = configureStore({
  reducer: {
    widgets: widgetsSlice.reducer,
  },
});
