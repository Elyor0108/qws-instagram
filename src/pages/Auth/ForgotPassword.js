import { Link } from "react-router-dom";
import { LOGIN } from "../../routes/routes";
import React, { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [emailObbo, setEmailAnaAnaAns] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, emailObbo)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setError(`${error.code} ${error.message}`);
      });
  };

  const isInvalid = emailObbo.trim() === "";

  useEffect(() => {
    document.title = "Forgot Password - Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
      <div className="flex flex-col">
        <div className="border-[1px] bg-white p-4 w-80 p-3 border-[#dbdbdb]">
          <div className="w-full">
            <img src="/images/instatext.png" className="mt-2 max-w-[8rem] mx-auto my-2" alt="instagram"/>
          </div>
          <p className="text-center font-bold  text-[light] text-slate-800">Update password</p>
          <p className="my-4 text-center text-sm text-[#8e8e8e]">
            Enter your email we'll send you a link to
            get back into your account.
          </p>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="" method="post">
            <div>
              <input type="text" aria-label="Enter your email address" placeholder="Enter Your Email" className="text-xs py-2 pl-3 mb-3 outline-none border-[1px] rounded-lg bg-white w-full border-[#dbdbdb]" value={emailObbo} onChange={(e) => setEmailAnaAnaAns(e.target.value)}/>
            </div>
            <div>
              <button disabled={isInvalid} type="submit" className={`bg-[#0095f6]  mt-3 cursor-pointer text-white rounded w-full h-8 font-semibold  ${isInvalid && "!bg-[#c0dffd]"}`}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="flex bg-[#FAFAFA] justify-center items-center flex-col border-t-0 w-full bg-white p-4 border-[1px] border-[#dbdbdb]">
          <p className="text-sm"><Link to={LOGIN} className="text-[blue]">Back to Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
