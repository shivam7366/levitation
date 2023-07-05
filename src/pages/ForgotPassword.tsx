import React from "react";

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter your email address"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
