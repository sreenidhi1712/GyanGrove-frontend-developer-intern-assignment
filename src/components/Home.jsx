
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import {closeInstructions} from '../store';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showInstructions = useSelector((state) => state.widgets.showInstructions);
  // const [showInstructions, setShowInstructions] = useState(true);
  return (
    <>z
      <div className={`fixed inset-0 bg-slate-400 bg-opacity-75 flex items-center justify-center z-10 ${showInstructions ? 'flex' : 'hidden'}`}>
        <div className="w-[90%] md:w-[70%] lg:w-[50%] bg-yellow-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Instructions</h2>
          <ul className="list-disc list-inside mb-4">
            <li>This is a quiz project made only through frontend.</li>
            <li>Due to time constraints, the backend wasnt implemented.</li>
            <li>All data is stored using the Redux toolkit.</li>
            <li>The data will be erased once the browser is refreshed.</li>
            <li>Users can take some pre-stored quizzes.</li>
            <li>Users can create their own quizzes, but as mentioned, it is stored in Redux and will be erased once refreshed. Kindly go through it.</li>
            <li>Users can view their previous scores of all the quizzes taken by them until their browser is refreshed.</li>
          </ul>
          <div className="flex justify-center">
            <button className="h-10 w-24 bg-blue-500 text-white rounded-md" onClick={() => dispatch(closeInstructions(false))}>Close</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-purple-300">
        <h1 className="text-4xl font-bold mb-8 text-center mt-10 text-white">Online Quiz Platform</h1>
        <div className="w-full flex flex-wrap justify-center gap-3">
          <div className='w-[90%] md:w-1/3 h-28 border-slate-100 border-2 bg-green-400 flex justify-center items-center rounded-xl shadow-md transform transition-transform hover:scale-105 cursor-pointer' onClick={() => navigate('/quizlist')}>
            <p className='text-2xl text-white font-bold'>Take Quiz</p>
          </div>
          <div className='w-[90%] md:w-1/3 h-28 border-slate-100 border-2 bg-red-400 flex justify-center items-center rounded-xl shadow-md transform transition-transform hover:scale-105 cursor-pointer' onClick={() => navigate('/create')}>
            <p className='text-2xl text-white font-bold'>Create Your Own Quiz</p>
          </div>
          <div className='w-[90%] md:w-1/3 h-28 border-slate-100 border-2 bg-blue-400 flex justify-center items-center rounded-xl shadow-md transform transition-transform hover:scale-105 cursor-pointer' onClick={() => navigate('/previous-results')}>
            <p className='text-2xl text-white font-bold'>View Your Past Results</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;