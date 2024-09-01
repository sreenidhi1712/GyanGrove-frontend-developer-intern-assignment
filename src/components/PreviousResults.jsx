import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PreviousResults = () => {
  const results = useSelector((state) => state.widgets.results);
  const quizzes = useSelector((state) => state.widgets.quizzes);

  if (results.length === 0) {
    return <p>No previous results found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Previous Results</h2>
      <ul>
        {results.map((result, index) => {
          const quiz = quizzes.find((quiz) => quiz.id === result.quizId);
          return (
            <li key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-semibold">{quiz.name}</h3>
              <p>Score: {result.totalScore} / {quiz.questions.length}</p>
              <p>Unattended Questions: {result.unattended}</p>
              <p>Wrong Answers: {result.wrongAnswers}</p>
              <p>Submission Time: {new Date(result.submissionTime).toLocaleString()}</p>
              <Link to={`/results/${result.quizId}`} className="text-blue-500">View Detailed Results</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PreviousResults;