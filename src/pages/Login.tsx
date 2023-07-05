import React from "react";
import LoginForm from "../components/UI/LoginForm";
import Stepper from "../components/UI/Stepper";

const Login: React.FC = () => {
  return (
    <div>
      <h1 className="text-center mt-5">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
