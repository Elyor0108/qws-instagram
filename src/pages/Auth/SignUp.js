import InstaLogo from "../../icons/InstaLogo";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../../firebase/firebase";
import React, { useContext, useState, useEffect } from "react";
import { doesUsernameExist } from "../../firebase/firebaseGET";
import { HOME, LOGIN, FORGOTPASSWORD } from "../../routes/routes";

export default function SignUp() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullNameFulll] = useState("");
  const [username, setUsernameOvfsad] = useState("");

  const isInvalid = password === "" || email === "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usernameExists = await doesUsernameExist(username);
      if (!usernameExists.length) {
        try {
          const userResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

          await firebase.firestore().collection("users").add({
            userId: userResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
            aboutMe: "",
            avatarSrc:
              "https://parkridgevet.com.au/wp-content/uploads/2020/11/Profile-300x300.png",
          });
          await userResult.user.updateProfile({
            displayName: username,
          });
          navigate(HOME);
        } 
        catch (error) {
          setEmail("");
          setPassword("");
          setFullNameFulll("");
          setError(error.message);
        }
      } 
      else {
        setError("A user with this name has already been created!");
      }
    } 
    catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center">
        <div className="flex flex-col">
          <div className="rounded-[12px] bg-white p-4 mb-5 w-[25rem] border-gray-300" style={{
              boxShadow: "0px 21.0037px 31.5056px rgba(147, 153, 176, 0.15)",
            }}>
            <div className="w-full mb-[34px] justify-center mx-auto flex items-center space-x-4">
              <InstaLogo />
              <h1 className="text-3xl text-bold text-black">Instagram</h1>
            </div>
            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="" method="post">
              <div>
                <input type="text" aria-label="Enter your email username" placeholder=" Your Username" className="text-xs p-3 mb-3 bg-[#f0f0f0] focus:border-[#b9b7b7] border-[#dbdbdb] text-sm outline-none rounded-sm bg-white w-full" value={username} onChange={(e) => setUsernameOvfsad(e.target.value)}/>
              </div>
              <div>
                <input type="text" aria-label="Full name" placeholder=" Your Full Name" className="text-xs p-3 mb-3 bg-[#f0f0f0] focus:border-[#b9b7b7] border-[#dbdbdb] text-sm outline-none rounded-sm bg-white w-full" value={fullName} onChange={(e) => setFullNameFulll(e.target.value)}/>
              </div>
              <div>
                <input type="text" aria-label="Your email address" placeholder=" Your Email" className="text-xs p-3 mb-3 bg-[#f0f0f0] focus:border-[#b9b7b7] border-[#dbdbdb] text-sm outline-none rounded-sm bg-white w-full" value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input type="password" aria-label="Enter your password" placeholder="Password(12345678)" className="text-xs p-3 mb-3 bg-[#f0f0f0] focus:border-[#b9b7b7] border-[#dbdbdb] text-sm outline-none rounded-sm bg-white w-full" value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className="my-3 text-[#909090] text-xs text-center">
                People who use our service may have uploaded your contact
                information to Instagram.{" "}
                <a href="https://www.facebook.com/help/instagram/261704639352628" className="text-[#8f8f8f] font-semibold">
                  Learn More
                </a>
              </p>
              <div>
                <button disabled={isInvalid} type="submit" className={`bg-[#0095f6]  mt-3 cursor-pointer text-white rounded w-full h-8 font-semibold disabled:opacity-[0.4] disabled:cursor-auto`} style={{
                    background:
                      "linear-gradient(269.53deg, #A336BD -4.74%, #FF387D 29.23%, #FF5D34 70.94%, #FFAA1B 105.94%)",
                  }}>
                  Sign up
                </button>
              </div>
              <div className="text-center mt-3 ">
                <Link to={FORGOTPASSWORD} className="text-[#073c6e] text-center w-full text-xs my-3">Forgot password?</Link>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded-[12px]" style={{boxShadow: "0px 21.0037px 31.5056px rgba(147, 153, 176, 0.15)",}}>
            <p className="text-sm text-[#1877F2]">Have an account?<Link to={LOGIN} className="font-semibold ml-1 text-blue-500">Log In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
