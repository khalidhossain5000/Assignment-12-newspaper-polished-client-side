import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { TbFidgetSpinner } from 'react-icons/tb'
import { Link, useLocation, useNavigate } from 'react-router'
import SocialLogin from "../SocialLogin/SocialLogin";
const LogIn = () => {
  const { logInUser, loading } = useAuth();
  const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logInUser(email,password)
    .then((result)=>{
        console.log(result);
        alert("log in success")
        navigate(from)
    })
    .catch(error=>{
        console.log(error);
    })
  };
  //google sign in
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
            Forgot password?
          </button>
        </div>
        {/* social logi componnet */}
        <SocialLogin/>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/auth/register"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LogIn;
