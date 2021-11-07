interface ErrorMessageProps {
  text?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return (
    <div>
      <p>Oh no! An error occured.</p>
      {text && <p>{text}</p>}
    </div>
  );
};

export default ErrorMessage;
