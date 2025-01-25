import React from "react";
import { setFilterCategory } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const FilterControls = () => {


  const dispatch = useDispatch();
  const { filterCategory, categoryList } = useSelector(
    (state) => state.inventory
  );

  return (
    // display all the categories in the dropdown to filter the items based on category
    <div className="mb-4">
      <label className="block mb-1 font-bold">Filter by Category</label>
      <select
        value={filterCategory}
        onChange={(e) => dispatch(setFilterCategory(e.target.value))}
        className="border px-2 py-1 rounded-lg"
      >
        {categoryList.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterControls;
