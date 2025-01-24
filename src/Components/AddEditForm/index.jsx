// src/components/AddEditForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store';

const AddEditForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price,setPrice] = useState('');

  // Populate form fields when editing an item

  const handleSubmit = (e) => {
    e.preventDefault();
      dispatch(addItem({ id: Date.now(), name, category, quantity: parseInt(quantity, 10),price:parseInt(price,10) }));
    setName('');
    setCategory('');
    setQuantity('');
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Add Item</h2>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Item name"
        />
      </div>
      <div>
        <label className="block mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Item category"
        />
      </div>
      <div>
        <label className="block mb-1">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Item name"
        />
      </div>
      <div>
        <label className="block mb-1">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full border px-2 py-1"
          placeholder="Item quantity"
        />
      </div>
      <div className="flex space-x-4">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Add Item
        </button>
      </div>
    </form>
  );
}
export default AddEditForm;
