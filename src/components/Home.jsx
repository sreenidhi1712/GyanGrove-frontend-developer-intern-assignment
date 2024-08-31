import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Online Quiz Platform</h1>
      <div className="space-x-4">
        <Link
          to="/create-quiz"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Quiz
        </Link>
        <Link
          to="/take-quiz"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
};

export default Home;
