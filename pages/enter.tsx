import { NextPage } from "next";
import LoginForm from "ui/Auth/LoginForm";
import MinHeader from "ui/Layout/MinHeader";

// Login page
const Enter: NextPage = () => {
  return (
    <div className="w-full h-full flex relative sm:items-center sm:justify-center">
      <div className="block sm:hidden absolute top-0 w-full bg-paper">
        <MinHeader />
      </div>
      <div className="bg-paper flex-grow mt-16 py-8 px-4 sm:h-96 sm:mx-2 sm:rounded-lg sm:py-4 sm:flex-grow-0">
        <LoginForm />
      </div>
    </div>
  );
};

export default Enter;
