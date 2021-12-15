interface ErrorMessageProps {
  text?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="text-red-500 dark:text-red-400 text-lg font-semibold">
        Oh no! An error occured.
      </p>
      {text && <p className="text-sm mt-1 text-tMuted">{text}</p>}
    </div>
  );
};

export default ErrorMessage;
