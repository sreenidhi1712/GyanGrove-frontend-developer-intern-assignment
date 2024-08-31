
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ResultAnalysis = () => {
  const { id } = useParams(); // Use useParams to get the quiz ID from the route
  const quiz = useSelector((state) => state.widgets.quizzes.find((quiz) => quiz.id === id));
  const responses = useSelector((state) => state.widgets.responses[id]);

  if (!quiz || !responses) {
    return <p>Quiz or responses not found</p>;
  }

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (responses[index] === question.correctOption) {
        score += 1;
      }
    });
    return score;
  };

  const calculateUnattended = () => {
    let unattended = 0;
    quiz.questions.forEach((question, index) => {
      if (responses[index] === 'unattended') {
        unattended += 1;
      }
    });
    return unattended;
  };

  const score = calculateScore();
  const totalQuestions = quiz.questions.length;
  const unattended = calculateUnattended();
  const correctAnswers = score;
  const wrongAnswers = totalQuestions - correctAnswers - unattended;

  const data = {
    labels: ['Correct', 'Wrong'],
    datasets: [
      {
        data: [correctAnswers, wrongAnswers,unattended],
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="mb-4">Your Score: {score} / {totalQuestions}</p>
      <div className="relative w-64 h-64 mx-auto mb-4">
        <Pie data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold">{score} / {totalQuestions}</div>
        </div>
      </div>
      <ul>
        {quiz.questions.map((question, questionIndex) => {
          const userAnswer = responses[questionIndex];
          const isUserAnswerCorrect = userAnswer === question.correctOption;
          return (
            <li key={questionIndex} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-semibold">{question.question}</h3>
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
              {/* <p className="mt-2">Your Answer: {userAnswer} {isUserAnswerCorrect ? 'is Right':''}</p> */}
              {isUserAnswerCorrect ? <p> {userAnswer} is Correct Answer</p> : <p>{userAnswer === "unattended"? "Did Not Attended this question" : `Your Answer:  ${userAnswer}` }</p>}
              {!isUserAnswerCorrect && <p>Correct Answer: {question.correctOption}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResultAnalysis;


