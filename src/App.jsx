
import { Provider } from 'react-redux';
import store from './store';
import FilterControls from './Components/Filter';
import AddEditForm from './Components/AddEditForm';
import InventoryTable from './Components/InventoryTable';


const App = () => {
  return (
    <Provider store={store}>
     <div className="p-6 w-full min-h-screen bg-slate-100">
        <h1 className="text-5xl font-bold mb-6 text-center">Inventory Management</h1>
        <div className='flex  mt-10 p-5 gap-10 w-full'>
                <div className='w-[65%] flex flex-col gap-5'>
                  <div className='w-full justify-evenly'> 
                      <FilterControls />
                  </div>
                  <InventoryTable/>
                </div>
                <div className='w-[30%]'>
                  <AddEditForm />
                </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;