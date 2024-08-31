import  { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { addQuiz, addCategory } from '../store'; // Import the addQuiz and addCategory actions

const QuizCreation = () => {
  const [quiz, setQuiz] = useState({ title: '', questions: [] });
  const [validationMessages, setValidationMessages] = useState([]);
  const dispatch = useDispatch();

  const handleAddQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { question: '', options: ['', '', '', ''], correctOption: '' }],
    });
    setValidationMessages([...validationMessages, '']);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const questions = [...quiz.questions];
    questions[questionIndex].options[optionIndex] = value;
    setQuiz({ ...quiz, questions });
    validateQuestion(questionIndex);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const questions = [...quiz.questions];
    questions[questionIndex].correctOption = value;
    setQuiz({ ...quiz, questions });
    validateQuestion(questionIndex);
  };

  const validateQuestion = (questionIndex) => {
    const question = quiz.questions[questionIndex];
    const uniqueOptions = new Set(question.options);
    let message = '';

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
    for (const question of quiz.questions) {
      if (!question.options.includes(question.correctOption)) {
        return;
      }
    }
    const newCategory = { id: quiz.title, name: quiz.title };
    dispatch(addCategory(newCategory));
    dispatch(addQuiz({ ...quiz, category: newCategory.id }));
  };

  const isSaveDisabled = quiz.questions.some((question) => {
    const uniqueOptions = new Set(question.options);
    return (
      uniqueOptions.size !== question.options.length ||
      !question.options.includes(question.correctOption)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      <input
        type="text"
        placeholder="Quiz Title"
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        className="border p-2 mb-4 w-full"
      />
      {quiz.questions.map((q, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Question"
            value={q.question}
            onChange={(e) => {
              const questions = [...quiz.questions];
              questions[index].question = e.target.value;
              setQuiz({ ...quiz, questions });
            }}
            className="border p-2 mb-2 w-full"
          />
          {q.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              placeholder={`Option ${optionIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              className="border p-2 mb-2 w-full"
            />
          ))}
          <input
            type="text"
            placeholder="Correct Answer"
            value={q.correctOption}
            onChange={(e) => handleCorrectOptionChange(index, e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          {validationMessages[index] && (
            <p className="text-red-500">{validationMessages[index]}</p>
          )}
        </div>
      ))}
      <button onClick={handleAddQuestion} className="bg-blue-500 text-white p-2 rounded mr-2">
        Add Question
      </button>
      <button
        onClick={handleSaveQuiz}
        className="bg-green-500 text-white p-2 rounded"
        disabled={isSaveDisabled}
      >
        Save Quiz
      </button>
    </div>
  );
};

export default QuizCreation;