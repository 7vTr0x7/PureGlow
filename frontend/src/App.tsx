import React from "react";

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-center sm:text-5xl">
        Welcome to My Website
      </h1>
      <p className="mt-4 text-center text-lg sm:text-xl">
        Here is the rest of the content...
      </p>
    </div>
  );
};

export default App;
