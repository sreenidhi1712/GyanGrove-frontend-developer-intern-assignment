import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizCreation from './components/QuizCreation';
import QuizTaking from './components/QuizTaking';
import ResultAnalysis from './components/ResultAnalysis';
import QuizList from './components/QuizList';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/create" element={<QuizCreation />} />
        <Route path="/quiz/:id" element={<QuizTaking />} />
        <Route path="/results/:id" element={<ResultAnalysis />} />
        <Route path="/" element={<QuizList />} />
      </Routes>
    </Router>
    </Provider>
  );
};

export default App;