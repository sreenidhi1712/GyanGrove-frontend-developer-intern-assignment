import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const quizzes = useSelector((state) => state.widgets.quizzes);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 bg-purple-300 min-h-screen min-w-full">
      <h2 className="text-3xl font-bold mb-6 text-center mt-10 text-white">
        Available Quizzes
      </h2>
      <div className="w-full flex flex-wrap gap-4 justify-center mt-10">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="h-20 w-[90%] md:w-[45%] lg:w-[30%] bg-slate-100 flex justify-between items-center rounded-lg p-4 shadow-md"
          >
            <p className="text-black text-lg font-bold">{quiz.name} quiz</p>
            <button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="h-10 w-24 rounded-lg bg-blue-500 text-white font-semibold transform transition-transform hover:scale-105"
            >
              Take quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;