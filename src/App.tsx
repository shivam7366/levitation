import "./App.css";
import React from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import ProgressForm from "./pages/ProgressForm";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state: any) => state.isAuthenticated);
  console.log(isAuth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuth ? (
          <Route path="form" element={<ProgressForm />} />
        ) : (
          <Route
            path="form"
            element={
              <div className="text-center"> you are not Authenticated</div>
            }
          />
        )}

        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
