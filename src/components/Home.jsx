import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  return (
    <>
    <div className={`absolute w-screen  bg-slate-400 min-h-screen ${showInstructions?`flex`:`hidden`} items-center justify-center z-10`}>
        <div className="h-[90%] w-[90%] flex flex-col items-center bg-yellow-100 p-2 rounded-lg">
          <p className='text-lg font-bold '>We have Some Instructions</p>
          <p> -- This is quiz project that made only through frontent</p>
          <p> -- Due to time constraint backend wasnt implemented</p>
          <p> -- So all the data is stored using the Redux toolikit</p>
          <p> -- So the data will be erased once the browser is refreshed</p>
          <p> -- User can take some pre stored quizzes,</p>
          <p> -- user can create their own quiz,but as mentioned it is stored in the redux,will be erased once refreshed,Kindly go through it</p>
          <p> -- User can view their previous scores of all the quizzes taken by them until their browser is refreshed</p>
          <button className='h-10 w-20 bg-blue-500 rounded-md my-2' onClick={()=>setShowInstructions(false)}>Close</button>
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