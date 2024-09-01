import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const QuizList = () => {
  const quizzes = useSelector((state) => state.widgets.quizzes);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4  bg-purple-300 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center mt-10 text-white">
        Available Quizzes
      </h2>
      <div className="w-full flex flex-wrap gap-3 justify-center mt-10">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="h-16 w-[98%] bg-slate-100 flex justify-between items-center rounded-lg p-2"
          >
            <p className="text-black text-lg font-bold">{quiz.name} quiz</p>
            <button onClick={() => navigate(`/quiz/${quiz.id}`)} className="h-8 w-20 rounded-lg bg-blue-400 text-white">Take quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
