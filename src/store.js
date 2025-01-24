import { configureStore, createSlice } from '@reduxjs/toolkit';
// import data from './Data.json'; // Import Data.json

const initialState = {
  items: [], // Array of inventory items
  filterCategory: 'All', // For filtering items
  categoryList: ['All'], // List of categories
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      if(!state.categoryList.includes(action.payload.category)){
        state.categoryList.push(action.payload.category);
      }

    },
    updateItem: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index >= 0) state.items[index] = { ...state.items[index], ...updatedData };
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setCategoryList: (state,action) => {
      const {oldcategoryName,newcategoryName} = action.payload;
      if(oldcategoryName === newcategoryName){
        console.log('Category already exists');
      }
      else{
        state.categoryList = state.categoryList.filter((category) => category !== oldcategoryName);
        state.categoryList.push(newcategoryName);
      }
    
    },
  },
});

export const { addItem, updateItem, deleteItem, setFilterCategory ,setCategoryList} = inventorySlice.actions;

const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
  },
});

export default store;