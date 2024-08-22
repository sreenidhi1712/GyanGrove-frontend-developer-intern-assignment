

import PropTypes from 'prop-types';

function Popup({handlepopup, newWidget, setNewWidget, handleAddWidget}) {
  // Add 'handlepopup' to the props validation
  Popup.propTypes = {
    handlepopup: PropTypes.func.isRequired,
    newWidget: PropTypes.object.isRequired,
    setNewWidget: PropTypes.func.isRequired,
    handleAddWidget: PropTypes.func.isRequired
  };
  return (
    <div className="absolute h-1/2 w-1/3 rounded-lg bg-white top-1/4 left-1/3 border-2 border-black z-50 flex flex-col items-center">
    <div className="flex justify-between items-center px-2 w-full mt-2">
      <h3 className="text-xl font-bold">Add Widget</h3>
      <button onClick={handlepopup} className='text-2xl px-4 text-white bg-slate-400 rounded-md'>x</button>
    </div>
    <input
      type="text"
      className="border-2 border-slate-400 p-2 w-[50%] mt-4"
      placeholder="Widget Name"
      value={newWidget.name}
      onChange={(e) =>
        setNewWidget({ ...newWidget, name: e.target.value })
      }
    />
    <input
      type="text"
      className="border-2 border-slate-400 p-2 w-[50%] mt-4"
      placeholder="Widget Text "
      value={newWidget.text}
      onChange={(e) =>
        setNewWidget({ ...newWidget, text: e.target.value })
      }
    />

    <button onClick={handleAddWidget} className='bg-green-300 text-white rounded-md p-2 mt-3'>Add Widget</button>
  </div>
  )
}

export default Popup
