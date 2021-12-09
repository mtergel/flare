interface SavedToastProps {
  visible: boolean;
  onClose: () => void;
  published?: boolean;
  onClick: () => void;
}
const SavedToast: React.FC<SavedToastProps> = ({
  visible,
  onClose,
  published,
  onClick,
}) => {
  return (
    <div
      className={`${
        visible ? "animate-enter" : "animate-leave"
      } border-l-4 border-green-500 max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-10 w-10 flex items-center justify-center">
              {published ? "🎉" : "👏"}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-tDefault">Article saved!</p>
            <button
              onClick={onClick}
              className="mt-1 text-sm text-tMuted cursor-pointer"
            >
              {published
                ? "Check out your article here."
                : " See your preview here."}
            </button>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={onClose}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedToast;
