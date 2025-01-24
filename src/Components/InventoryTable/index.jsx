// src/components/InventoryTable.jsx
import React, { useState } from 'react';
import { deleteItem, setSortBy, updateItem ,setCategoryList} from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const InventoryTable = () => {
  const dispatch = useDispatch();
  const { items, filterCategory, sortBy } = useSelector((state) => state.inventory);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '' ,category: '', quantity: ''});

  const filteredItems = filterCategory === 'All'
    ? items
    : items.filter((item) => item.category === filterCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'quantity') return a.quantity - b.quantity;
    return 0;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };


 const  handleSaveClick = (item)=>{
dispatch(updateItem({id: editRowId, updatedData: editData}));
dispatch(setCategoryList({oldcategoryName:item.category,newcategoryName:editData.category}));
setEditRowId(null);
 }

  const handleEditClick = (product) => {
    setEditRowId(product.id);
    setEditData({ name: product.name, price: product.price, category: product.category, quantity: product.quantity });
  };
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">
              Quantity
              {/* <button
                onClick={() => dispatch(setSortBy('quantity'))}
                className="ml-2 text-sm text-blue-500 underline"
              >
                Sort
              </button> */}
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? 'bg-red-100' : ''}
            >
             {editRowId === item.id ? (
                <>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={editData.quantity}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <button className='p-2 bg-green-400 font-bold text-white' onClick={() => {
                    handleSaveClick(item)
                  }}
                    >Save</button>
                </td>

                </>
         
):(
<>
<td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500" onClick={()=>handleEditClick(item)}>Edit</button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => dispatch(deleteItem(item.id))}
                >
                  Delete
                </button>
              </td>
</>
)
}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
