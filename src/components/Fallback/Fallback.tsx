import Spinner from "@/components/Spinner/Spinner";

/**
 * General use fallback component
 * will show Spinner component in center
 */
const Fallback: React.FC<{}> = () => {
  return (
    <div className="h-full flex-grow flex items-center justify-center text-primary-500">
      <Spinner />
    </div>
  );
};

export default Fallback;
