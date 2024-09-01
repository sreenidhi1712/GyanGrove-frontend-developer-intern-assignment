import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addResult } from '../store'; // Import the addResult action

const QuizTaking = () => {
  const { id } = useParams(); // Use useParams to get the quiz ID from the route
  const quiz = useSelector((state) => state.widgets.quizzes.find((quiz) => quiz.id === id));
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    let totalScore = 0;
    let unattended = 0;
    let wrongAnswers = 0;

    quiz.questions.forEach((question, index) => {
      if (!responses[index] || responses[index] === 'unattended') {
        unattended++;
      } else if (responses[index] === question.correctOption) {
        totalScore++;
      } else {
        wrongAnswers++;
      }
    });

    const resultAnalysis = {
      quizId: id,
      totalScore,
      unattended,
      wrongAnswers,
      responses,
      submissionTime: new Date().toISOString(),
    };

    dispatch(addResult(resultAnalysis));
    navigate(`/results/${id}`);
  }, [dispatch, id, responses, quiz.questions, navigate]);

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
    <div className="container mx-auto p-4 bg-purple-200 min-h-screen flex flex-col items-center min-w-full">
      <h2 className="text-2xl font-bold mb-4">{quiz.name}</h2>
      <div className="mb-4 w-full lg:w-[60%] bg-white rounded-lg p-2 flex justify-center flex-col">
        <div className="px-2 flex justify-center items-center font-semibold min-h-36 w-[99%] bg-purple-200 rounded-lg">
          <p className='text-white font-bold text-2xl'>{currentQuestion.question}</p>
        </div>
        <div className='w-full flex flex-wrap gap-2 mt-5 md:grid md:grid-cols-2'>
          {currentQuestion.options.map((option, optionIndex) => (
            <div key={optionIndex} onClick={() => handleOptionChange(currentQuestionIndex, option)} className={`relative flex gap-2 h-10 w-full border-2 rounded-lg items-center p-2 justify-center ${responses[currentQuestionIndex] === option ? `bg-green-100 border-green-400` : `border-slate-300 bg-white`}`}>
              <label className='text-sm '>
                {option}
              </label>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={responses[currentQuestionIndex] === option}
                onChange={() => handleOptionChange(currentQuestionIndex, option)}
                className='absolute right-2'
              />
            </div>
          ))}
        </div>
        <div className="m-4">
          <div className="relative w-full h-4 bg-gray-300 rounded">
            <div
              className="absolute top-0 left-0 h-4 bg-blue-500 rounded"
              style={{ width: `${(timeLeft / 20) * 100}%` }}
            ></div>
          </div>
          <p className='text-center mt-2'>Time left: {timeLeft} seconds</p>
        </div>
        <button
          className="mt-4  px-4 py-2 bg-blue-500 text-white rounded transform transition-transform "
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuizTaking;