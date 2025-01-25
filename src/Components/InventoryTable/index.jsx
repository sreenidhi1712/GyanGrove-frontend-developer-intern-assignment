// src/components/InventoryTable.jsx
import React, { useState } from "react";
import { deleteItem, updateItem, setCategoryList } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const InventoryTable = () => {
  const dispatch = useDispatch();
  const { items, filterCategory, sortBy } = useSelector(
    (state) => state.inventory
  );
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
  });

  const filteredItems =
    filterCategory === "All"
      ? items
      : items.filter((item) => item.category === filterCategory);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "quantity") return a.quantity - b.quantity;
    return 0;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (item) => {
    dispatch(updateItem({ id: editRowId, updatedData: editData }));
    dispatch(
      setCategoryList({
        oldcategoryName: item.category,
        newcategoryName: editData.category,
      })
    );
    setEditRowId(null);
  };

  const handleEditClick = (product) => {
    setEditRowId(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
    });
  };
  return (
    <div className="w-full overflow-x-auto mt-5 rounded-lg  shadow-lg">
      <table className="table-auto w-full rounded-lg border-collapse border border-gray-100">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-gray-500 px-4 py-2">Name</th>
            <th className=" text-gray-500 px-4 py-2">Category</th>
            <th className=" text-gray-500 px-4 py-2">Price</th>
            <th className="text-gray-500 px-4 py-2">Quantity</th>
            {editRowId === null && (
              <th className="text-gray-500 px-4 py-2">status</th>
            )}
            <th className="text-gray-500 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => item.quantity > 0 &&  (
            <tr
              key={item.id}
              className={item.quantity < 10 ? "bg-red-100 " : ""}
            >
              {editRowId === item.id ? (
                <>
                  <td className="p-2 border-2">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className={
                       ` ${item.quantity < 10 ? "bg-red-100 " : "bg-inherit"} `
                      }
                    />
                  </td>
                  <td className=" p-2 border-2">
                    <input
                      type="text"
                      name="category"
                      value={editData.category}
                      onChange={handleInputChange}
                      className={
                         ` ${item.quantity < 10 ? "bg-red-100 " : "bg-inherit"}`
                      }
                    />
                  </td>
                  <td className="  p-2 border-2">
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleInputChange}
                      className={
                        ` ${item.quantity < 10 ? "bg-red-100 " : "bg-inherit"}`
                      }
                    />
                  </td>
                  <td className="  p-2 border-2">
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleInputChange}
                      className={
                       ` ${item.quantity < 10 ? "bg-red-100 " : "bg-inherit"}`
                      }
                    />
                  </td>

                  <td className="text-center  px-4 py-2">
                    <button
                      className="px-2 py-1 bg-green-400 font-bold text-white rounded-lg"
                      onClick={() => {
                        handleSaveClick(item);
                      }}
                    >
                      Save
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="font-semibold px-4 py-2 text-center">
                    {item.name}
                  </td>
                  <td className="font-semibold px-4 py-2 text-center">
                    {item.category}
                  </td>
                  <td className="font-semibold px-4 py-2 text-center">
                    Rs {item.price}
                  </td>
                  <td className="font-semibold px-4 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td
                    className={` ${
                      item.quantity >= 10 ? "text-green-500 " : "text-red-500"
                    } text-xs px-1  py-2 font-bold text-center`}
                  >
                    <span
                      className={`${
                        item.quantity >= 10
                          ? "border-green-500 border-2 p-1 bg-green-100 rounded-xl"
                          : "border-red-500 border-2 p-1 bg-red-100 rounded-xl"
                      }`}
                    >
                      {item.quantity >= 10 ? "in stock" : "low stock"}
                    </span>
                  </td>
                  <td className=" px-4 py-2 flex items-center justify-evenly gap-1">
                    <button
                      className="text-white bg-blue-500 rounded-lg font-bold px-3 py-1"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white bg-red-500 rounded-lg font-bold px-3 py-1"
                      onClick={() => dispatch(deleteItem(item))}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
