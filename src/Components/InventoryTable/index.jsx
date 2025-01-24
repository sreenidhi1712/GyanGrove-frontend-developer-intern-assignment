// src/components/InventoryTable.jsx
import React, { useState } from 'react';
import { deleteItem, updateItem ,setCategoryList} from '../../store';
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
    <div className="overflow-x-auto mt-10 rounded-lg  shadow-lg">
      <table className="table-auto w-full rounded-lg border-collapse border border-gray-100">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">
              Quantity
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? 'bg-red-100 border-2 border-red-200' : ''}
            >
             {editRowId === item.id ? (
                <>
                <td className=' border px-4 py-2'>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className='  w-full'
                  />
                </td>
                <td className='border px-4 py-2'>
                  <input
                    type="text"
                    name="category"
                    value={editData.category}
                    onChange={handleInputChange}
                    className=' w-full'
                  />
                </td>
                <td className=' border px-4 py-2'>
                  <input
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleInputChange}
                      className=' w-full'
                  />
                </td>
                <td className=' border px-4 py-2'>
                  <input
                    type="number"
                    name="quantity"
                    value={editData.quantity}
                    onChange={handleInputChange}
                      className=' w-full '
                  />
                </td>
                <td className='flex justify-center items-center border px-4 py-2'>
                  <button className='px-2 py-1 bg-green-400 font-bold text-white rounded-lg' onClick={() => {
                    handleSaveClick(item)
                  }}
                    >Save</button>
                </td>

                </>
         
):(
<>
<td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">Rs {item.price}</td>
              <td className="border px-4 py-2 ">
                {item.quantity} {item.quantity < 10 && <span className="text-red-500 font-bold text-xs border-2 border-red-300 rounded-lg p-1 ml-5">Low Stock</span>}
              </td>
              <td className="border px-4 py-2 flex items-center justify-evenly">
                <button className="text-white bg-blue-500 rounded-lg font-bold px-3 py-1" onClick={()=>handleEditClick(item)}>Edit</button>
                <button
                  className="text-white bg-red-500 rounded-lg font-bold px-3 py-1"
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
