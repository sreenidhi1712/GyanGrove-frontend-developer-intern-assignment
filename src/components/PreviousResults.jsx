import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PreviousResults = () => {
  const results = useSelector((state) => state.widgets.results);
  const quizzes = useSelector((state) => state.widgets.quizzes);
  const navigate = useNavigate();

  if (results.length === 0) {
    return <div className='min-h-screen min-w-full bg-purple-300 flex justify-center items-center'>
      <p className="text-center text-3xl text-white mt-10">No previous results found</p>
      </div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen bg-purple-300 items-center min-w-full">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Previous Results</h2>
      <div className="flex flex-col w-full max-w-4xl">
        {results.map((result, index) => {
          const quiz = quizzes.find((quiz) => quiz.id === result.quizId);
          return (
            <div key={index} className="mb-6 p-6 border-2 border-slate-200 rounded-lg bg-white shadow-lg">
              <h3 className="text-2xl font-bold mb-2">{quiz.name}</h3>
              <div className="mb-4">
                <p className="text-lg"><span className="font-bold text-green-600">Score:</span> {result.totalScore} / {quiz.questions.length}</p>
                <p className="text-lg"><span className="font-bold text-amber-400">Unattended Questions:</span> {result.unattended}</p>
                <p className="text-lg"><span className="font-bold text-red-400">Wrong Answers:</span> {result.wrongAnswers}</p>
                <p className="text-lg"><span className="font-bold text-blue-400">Submission Time:</span> {new Date(result.submissionTime).toLocaleString()}</p>
              </div>
              <button onClick={() => navigate(`/results/${result.quizId}`)} className="text-white h-10 w-full md:w-auto bg-blue-500 rounded-lg px-4 py-2 font-semibold transform transition-transform hover:scale-105">
                View Detailed Results
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviousResults;