
import { Provider } from 'react-redux';
import store from './store';
import FilterControls from './Components/Filter';
import AddEditForm from './Components/AddEditForm';
import InventoryTable from './Components/InventoryTable';


const App = () => {
  return (
    <Provider store={store}>
     <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
        <FilterControls />
        <AddEditForm />
        <InventoryTable/>
      </div>
    </Provider>
  );
};

export default App;