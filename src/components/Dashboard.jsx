// src/components/Dashboard.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCategory,
  removeCategory,
  addWidget,
  removeWidget,
  setSearchTerm,
} from "../store";
import Popup from "./Popup";
// import {uncheckWidget} from '../store'

const Dashboard = () => {
  const { categories, searchTerm } = useSelector((state) => state.widgets);
  const dispatch = useDispatch();

  const [newWidget, setNewWidget] = useState({ name: "", text: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [alertShown, setAlertShown] = useState(false);
  const [searchAlertShown, setSearchAlertShown] = useState(false);
  const [hasFound, setHasFound] = useState(true);

  const handlepopup = (category) => {
    setOpenPopup(!openPopup);
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    if (newCategory) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
      if (!alertShown) {
        alert(`Category Added ${newCategory}`);
        setAlertShown(true);
      }
    }
  };

  const handleAddWidget = () => {
    if (selectedCategory && newWidget.name) {
      const widget = { id: Date.now(), ...newWidget };
      dispatch(addWidget({ category: selectedCategory, widget }));
      setNewWidget({ name: "", text: "" });
      setOpenPopup(!openPopup);
    }
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    const hasResults = Object.keys(categories).some((category) =>
      categories[category].some((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setHasFound(hasResults);
    if (!hasResults && !searchAlertShown) {
      setSearchAlertShown(true);
      alert("No results found");
    }
  };

  const handleSearchTermChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setSearchAlertShown(false); // Reset alert shown state when search term changes
  };

  const filteredWidgets = (category) => {
    if (!searchTerm) return categories[category];
    return categories[category].filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="mb-4 flex">
          <input
            type="text"
            className="border p-2 w-96"
            placeholder="Search Widgets"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="border p-2 mr-2"
            placeholder="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white"
            onClick={handleAddCategory}
          >
            +Add Category
          </button>
        </div>
      </div>

      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-4">
          {openPopup && (
            <Popup
              handlepopup={handlepopup}
              newWidget={newWidget}
              setNewWidget={setNewWidget}
              handleAddWidget={handleAddWidget}
            />
          )}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">{category}</h3>
            <button
              className="ml-2 p-2 bg-red-500 text-white"
              onClick={() => dispatch(removeCategory(category))}
            >
              Remove Category
            </button>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-4 flex-wrap">
              {!hasFound ? categories[category].map((widget) => (
                  <div
                    key={widget.id}
                    className="border p-4 bg-white rounded-lg min-h-52 min-w-96 flex flex-col justify-center relative"
                  >
                    <div className="">
                      <h4 className="font-bold absolute top-1">{widget.name}</h4>
                      <div
                        className="absolute top-1 right-1 bg-slate-300 px-3 cursor-pointer text-white text-2xl rounded-md"
                        onClick={() =>
                          dispatch(
                            removeWidget({ category, widgetId: widget.id })
                          )
                        }
                      >
                        x
                      </div>
                    </div>
                    <p>{widget.text}</p>
                  </div>
                ))
              : filteredWidgets(category).map((widget) => (
                  <div
                    key={widget.id}
                    className="border p-4 bg-white rounded-lg min-h-52 min-w-96 flex flex-col justify-center relative"
                  >
                    <div className="">
                      <h4 className="font-bold absolute top-1">{widget.name}</h4>
                      <div
                        className="absolute top-1 right-1 bg-slate-300 px-3 cursor-pointer text-white text-2xl rounded-md"
                        onClick={() =>
                          dispatch(
                            removeWidget({ category, widgetId: widget.id })
                          )
                        }
                      >
                        x
                      </div>
                    </div>
                    <p>{widget.text}</p>
                  </div>
                ))}
            </div>
            <div className="border flex items-center justify-center bg-white rounded-lg min-w-96 min-h-56">
              <button
                className="border-slate-300 border-2 p-2"
                onClick={() => handlepopup(category)}
              >
                + Add widget
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;