import InstaLogo from "../../icons/InstaLogo";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../firebase/firebase";
import React, { useContext, useState, useEffect } from "react";
import { HOME, SIGN_UP, FORGOTPASSWORD } from "../../routes/routes";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmailUffMas] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const [password, setPasswordSecret] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate(HOME);
    } 
    catch (error) {
      setEmailUffMas("");
      setPasswordSecret("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex space-x-5 items-center">
        <div className="flex flex-col ">
          <div className="bg-white px-4 py-[35px] w-80 rounded-[12px]" style={{
              boxShadow: "0px 21.0037px 31.5056px rgba(147, 153, 176, 0.15)",
            }}>
            <div className="w-full mb-[34px] justify-center mx-auto flex items-center space-x-4">
              <InstaLogo />
              <h1 className="text-3xl text-bold text-black">Instagram</h1>
            </div>

            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-3" method="post">
              <div>
                <input type="text" aria-label="Your email address" placeholder="Your email account" className="text-xs p-3 mb-3 bg-[#f0f0f0] focus:border-[#b9b7b7] border-[#dbdbdb] text-sm outline-none rounded-sm bg-white w-full" value={email} onChange={(e) => setEmailUffMas(e.target.value)}/>
              </div>
              <div>
                <input type="password" aria-label="Your password" placeholder="Password" className="text-xs p-3 mb-3 bg-[#f0f0f0] focus:border-[#b9b7b7] border-[#dbdbdb] text-sm outline-none rounded-sm bg-white w-full" value={password} onChange={(e) => setPasswordSecret(e.target.value)}/>
              </div>
              <div>
                <button disabled={isInvalid} type="submit" className={`mt-3 cursor-pointer text-white rounded w-full h-8 font-semibold disabled:opacity-[0.4] disabled:cursor-auto`} style={{
                    background:
                      "linear-gradient(269.53deg, #A336BD -4.74%, #FF387D 29.23%, #FF5D34 70.94%, #FFAA1B 105.94%)",
                  }}>
                  Log In
                </button>
              </div>
              <div className="text-center mt-3 ">
                <Link to={FORGOTPASSWORD} className="text-[#5A686C] text-center w-full text-xs my-3">Forgot password?</Link>
              </div>
              <div className="mt-3">
                <div className="flex justify-center items-center flex-col w-full p-4">
                  <p className="text-sm text-[grey]">
                    Don't have an account?
                    <Link to={SIGN_UP} className="font-semibold ml-2 text-blue-500" >Sign up</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
