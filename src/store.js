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
      const productToDelete = action.payload;
  
      // Delete the item from the items list
      state.items = state.items.filter((item) => item.name !== productToDelete.name);
      
      // Check if the category is still used by other products
      const remainingProductsInCategory = state.items.filter((item) => item.category === productToDelete.category);
      
      // If no products are left in the category, remove the category from the category list
      if (remainingProductsInCategory.length === 0) {
        state.categoryList = state.categoryList.filter((category) => category !== productToDelete.category);
      }
      
      // Reset the filter category to 'All'
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