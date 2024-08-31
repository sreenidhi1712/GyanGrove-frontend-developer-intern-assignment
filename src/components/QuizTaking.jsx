import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addResponse } from '../store'; // Import the addResponse action

const QuizTaking = () => {
  const { id } = useParams(); // Use useParams to get the quiz ID from the route
  const quiz = useSelector((state) => state.widgets.quizzes.find((quiz) => quiz.id === id));
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    dispatch(addResponse({ quizId: id, responses }));
    navigate(`/results/${id}`);
  }, [dispatch, id, responses, navigate]);

  const handleNextQuestion = useCallback(() => {
    if (!responses[currentQuestionIndex]) {
      setResponses({
        ...responses,
        [currentQuestionIndex]: 'unattended',
      });
    }
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(20);
    } else {
      handleSubmit();
    }
  }, [quiz.questions, currentQuestionIndex, responses, handleSubmit]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleNextQuestion]);

  if (!quiz) {
    return <p>Quiz not found</p>;
  }

  const handleOptionChange = (questionIndex, option) => {
    setResponses({
      ...responses,
      [questionIndex]: option,
    });
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{quiz.name}</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{currentQuestion.question}</h3>
        <ul>
          {currentQuestion.options.map((option, optionIndex) => (
            <li key={optionIndex}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={responses[currentQuestionIndex] === option}
                  onChange={() => handleOptionChange(currentQuestionIndex, option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <p>Time left: {timeLeft} seconds</p>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleNextQuestion}
      >
        Next Question
      </button>
    </div>
  );
};

export default QuizTaking;