// src/components/Spinner.jsx
const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      <p className="text-gray-500 mt-4 font-medium">Finding stations...</p>
    </div>
  );
};

export default Spinner;