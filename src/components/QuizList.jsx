import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const QuizList = () => {
  // Use useSelector to access the quizzes from the Redux store
  const quizzes = useSelector((state) => state.widgets.quizzes);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="mb-2">
              <h3 className="text-xl font-semibold">{quiz.name}</h3>
              <Link to={`/quiz/${quiz.id}`} className="text-blue-500">Take Quiz</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;