
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-200 p-8">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
