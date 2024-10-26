export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center">
        <div className="w-6 h-6 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }