
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const QuizList = () => {
  const quizzes = useSelector((state) => state.widgets.quizzes);


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="mb-2">
            <Link to={`/quiz/${quiz.id}`} className="text-blue-500">
              {quiz.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;