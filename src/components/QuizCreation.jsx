import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  addQuiz } from '../store';
import { useNavigate } from 'react-router-dom';



const QuizCreation = () => {

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    id:'',
    name:'',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: '',
      },
    ],
  });
  const [validationMessages, setValidationMessages] = useState([]);
  const dispatch = useDispatch();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].correctOption = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const validateQuestion = (question, questionIndex) => {
    let message = '';
    const uniqueOptions = new Set(question.options);

    if (uniqueOptions.size !== question.options.length) {
      message = 'All options must be unique.';
    } else if (!question.options.includes(question.correctOption)) {
      message = 'Correct answer must be one of the provided options.';
    }

    const messages = [...validationMessages];
    messages[questionIndex] = message;
    setValidationMessages(messages);
  };

  const handleSaveQuiz = () => {
    dispatch(addQuiz({  id: quiz.id, name: quiz.name , questions: quiz.questions }));
    navigate('/');
  };

  const isSaveDisabled = quiz.questions.some((question) => {
    const uniqueOptions = new Set(question.options);
    return (
      uniqueOptions.size !== question.options.length ||
      !question.options.includes(question.correctOption)
    );
  });

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: '', options: ['', '', '', ''], correctOption: '' },
      ],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Quiz</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Quiz Title
        </label>
        <input
          type="text"
          value={quiz.name}
          onChange={(e) => setQuiz({ ...quiz, name: e.target.value,id : `${e.target.value} ${Date.now()}` })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question {questionIndex + 1}
          </label>
          <input
            type="text"
            value={question.question}
            onChange={(e) =>
              handleQuestionChange(questionIndex, 'question', e.target.value)
            }
            onBlur={() => validateQuestion(question, questionIndex)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mt-2">
              <input
                type="text"
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
                onBlur={() => validateQuestion(question, questionIndex)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correct Option
            </label>
            <input
              type="text"
              value={question.correctOption}
              onChange={(e) =>
                handleCorrectOptionChange(questionIndex, e.target.value)
              }
              onBlur={() => validateQuestion(question, questionIndex)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {validationMessages[questionIndex] && (
            <p className="text-red-500 text-xs italic">
              {validationMessages[questionIndex]}
            </p>
          )}
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Question
      </button>
      <button
        onClick={handleSaveQuiz}
        disabled={isSaveDisabled}
        className={`bg-green-500 text-white p-2 rounded ${
          isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizCreation;