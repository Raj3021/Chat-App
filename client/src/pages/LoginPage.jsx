import React, { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubimmeted, setIsDataSubimmeted] = useState(false);

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault(); 

    if (currState === "Sign Up" && !isDataSubimmeted) {
      // Handle Sign Up logic
      // console.log("Sign Up Data:", { fullName, email, password, bio });
      setIsDataSubimmeted(true);
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", {fullName, email, password, bio}) 
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* ------- Left Side ------- */}
      <img
        src={assets.logo_big}
        alt=""
        className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]"
      />

      {/* ------- Right Side ------- */}

      <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
        <h2 className="font-medium text-2xl flex items-center justify-between">
          {currState}
          {isDataSubimmeted && <img onClick={() => {setIsDataSubimmeted(false)}} src={assets.arrow_icon} alt="" className="w-5 cursor-pointer " />}
          
        </h2>
        {currState === "Sign Up" && !isDataSubimmeted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubimmeted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubimmeted && (
          <textarea
            rows={4}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Provide a short bio"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500 ">
          <input type="checkbox" />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?
              <span onClick={() => {setCurrentState("Login"); setIsDataSubimmeted(false)}} className="font-medium text-violet-500 cursor-pointer">
                Login here  
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account
              <span onClick={() => {setCurrentState("Sign Up") }} className="font-medium text-violet-500 cursor-pointer">
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
