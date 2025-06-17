const Spinner = () => {
  return (
    <div className="flex space-x-3 items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
      <p className="text-xl font-semibold"> please be patient....</p>
    </div>
  );
};

export default Spinner;
