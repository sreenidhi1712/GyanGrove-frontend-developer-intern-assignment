import { configureStore, createSlice } from '@reduxjs/toolkit';
import data from './Data.json'; // Import Data.json

const initialState = {
  // Initialize the state with the dummy  data from Data.json
  items: data.products.map(product=>({
    name: product.name,
    category: product.category,
    price: product.price,
    quantity: product.quantity,
  })), 
  filterCategory: 'All', 
  // Get the unique categories from the data and add 'All' to the list
  categoryList: ['All', ...new Set(data.products.map(product => product.category))], 
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Add the item to the store
    addItem: (state, action) => {
      state.items.push(action.payload);
      if(!state.categoryList.includes(action.payload.category)){
        state.categoryList.push(action.payload.category);
      }

    },
    // Update the item in the store
    updateItem: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.items.findIndex((item) => item.name === id);
      if (index >= 0) state.items[index] = { ...state.items[index], ...updatedData };
    },

    // Delete the item from the store
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload.name);
      state.categoryList = state.categoryList.filter((category) => category !== action.payload.category);
      state.filterCategory = 'All';
    },

    // Set the filter category
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    //update the category list when category name is updated
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


// Configure the store with the reducer
const store = configureStore({
  reducer: {
    inventory: inventorySlice.reducer,
  },
});

export default store;