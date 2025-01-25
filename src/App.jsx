
import { Provider } from 'react-redux';
import store from './store';
import FilterControls from './Components/Filter';
import AddEditForm from './Components/AddEditForm';
import InventoryTable from './Components/InventoryTable';


const App = () => {
  return (
    <Provider store={store}>
     <div className="p-6 w-full min-h-screen bg-slate-100">
        <h1 className="text-2xl tab:text-4xl lap:text-5xl font-bold mb-6 text-center">Dynamic Inventory Management Table</h1>
        <div className='flex  flex-col-reverse mt-10 gap-10 w-full lap:flex-row lap:p-5'>
                <div className='w-[100%] flex flex-col gap-5 lap:w-[65%]'>
                  <div className='w-full justify-evenly'> 
                      <FilterControls />
                  </div>
                  <InventoryTable/>
                </div>
                <div className='w-[100%] lap:w-[30%]'>
                  <AddEditForm />
                </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;