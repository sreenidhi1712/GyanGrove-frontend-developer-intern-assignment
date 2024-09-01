import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-purple-300">
      <h1 className="text-4xl font-bold mb-8 text-center mt-10 text-white">Online Quiz Platform</h1>
      <div className="w-full flex flex-wrap justify-center gap-3">
        <div className='w-[90%] h-28 border-slate-100 border-2 bg-green-400 flex justify-center items-center rounded-xl' onClick={()=>navigate('/quizlist')}>
              <p className='text-2xl text-white font-bold'> Take Quiz</p>
        </div>
        <div className='w-[90%] h-28 border-slate-100 border-2 bg-red-400 flex justify-center items-center rounded-xl' onClick={()=>navigate('/create')}>
              <p className='text-2xl text-white font-bold'>Create Your Own Quiz </p>
        </div>
        <div className='w-[90%] h-28 border-slate-100 border-2 bg-blue-400 flex justify-center items-center rounded-xl' onClick={()=>navigate('/previous-results')}>
              <p className='text-2xl text-white font-bold'>View Your past Results </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
