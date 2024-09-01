import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ResultAnalysis = () => {
  const { id } = useParams(); // Use useParams to get the quiz ID from the route
  const quiz = useSelector((state) => state.widgets.quizzes.find((quiz) => quiz.id === id));
  const result = useSelector((state) => state.widgets.results.find((result) => result.quizId === id));
const navigate = useNavigate();

  if (!quiz || !result) {
    return <p className="text-center text-3xl text-black mt-10">Quiz or results not found</p>;
  }

  const { totalScore, unattended, wrongAnswers, responses } = result;
  const totalQuestions = quiz.questions.length;
  const correctAnswers = totalScore;

  const data = {
    labels: ['Correct', 'Wrong', 'Unattended'],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers, unattended],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
        hoverBackgroundColor: ['#66BB6A', '#EF5350', '#FFD54F'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    cutout: '60%',
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen bg-purple-300 min-w-full">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">Quiz Results</h2>
      <p className="mb-4 text-lg text-white">Your Score: {totalScore} / {totalQuestions}</p>
      <div className="relative w-64 h-64 mx-auto mb-4">
        <Pie data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold text-white">{totalScore} / {totalQuestions}</div>
        </div>
      </div>
      <ul className="w-full max-w-4xl">
        {quiz.questions.map((question, questionIndex) => {
          const userAnswer = responses[questionIndex];
          const isUserAnswerCorrect = userAnswer === question.correctOption;
          return (
            <li key={questionIndex} className="mb-4 p-4 border rounded bg-white shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
              <ul>
                {question.options.map((option, optionIndex) => {
                  const isCorrect = option === question.correctOption;
                  const isUserAnswer = option === userAnswer;
                  const bgColor = isCorrect ? 'bg-green-200' : isUserAnswer ? 'bg-red-200' : '';
                  return (
                    <li key={optionIndex} className={`p-2 ${bgColor}`}>
                      {option}
                    </li>
                  );
                })}
              </ul>
              {isUserAnswerCorrect ? (
                <p className="text-green-600">{userAnswer} is Correct Answer</p>
              ) : (
                <p className="text-red-600">{userAnswer === 'unattended' ? 'Did Not Attend this question' : `Your Answer: ${userAnswer}`}</p>
              )}
              {!isUserAnswerCorrect && <p className="text-blue-600">Correct Answer: {question.correctOption}</p>}
            </li>
          );
        })}
      </ul>
      <button onClick={()=>navigate('/')} className='h-10 w-32 bg-blue-400 rounded-lg text-white'>Back to Home</button>
    </div>
  );
};

export default ResultAnalysis;