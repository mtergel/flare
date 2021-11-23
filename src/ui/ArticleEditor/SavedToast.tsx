import Link from "next/link";

interface SavedToastProps {
  visible: boolean;
  onClose: () => void;
  viewLink: string;
  published?: boolean;
}
const SavedToast: React.FC<SavedToastProps> = ({
  visible,
  onClose,
  viewLink,
  published,
}) => {
  return (
    <div
      className={`${
        visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-10 w-10 flex items-center justify-center">👏</div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Article saved!</p>
            {published ? (
              <Link href={viewLink} passHref>
                <a className="mt-1 text-sm text-gray-500">
                  Check out your article here.
                </a>
              </Link>
            ) : (
              <a className="mt-1 text-sm text-gray-500">
                See your preview here.
              </a>
            )}
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
