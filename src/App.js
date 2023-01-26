import React from "react";
import Layout from "./Position/Layout";
import Login from "./pages/Auth/Login";
import UserPage from "./pages/UserPage";
import ReactLoading from "react-loading";
import SignUp from "./pages/Auth/SignUp";
import * as ROUTE from "./routes/routes";
import UserContext from "./contextFire/user";
import EditUserPage from "./pages/EditUserPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import useAuthListener from "./Helpers/AllHooks/useAuthListener";
import ProtectedRoute from "./Helpers/HelperEmoji/ProtectedRoute";
import IsUserLoggedIn from "./Helpers/HelperEmoji/IsUserLoggedIn";


export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <React.Suspense fallback={
            <div className="flex items-center justify-center h-screen">
              <ReactLoading type={"spin"} color={"#000"} height={"5%"} width={"5%"}/>
            </div>}>
          <Routes>
            <Route path={ROUTE.HOME} element={
                <ProtectedRoute user={user}>
                  <Layout />
                </ProtectedRoute>
              }>
              <Route index element={<HomePage />} />
              <Route path={ROUTE.PROFILE} element={<UserPage />} />
              <Route path={ROUTE.EDIT_PROFILE} element={<EditUserPage />} />
            </Route>
            <Route path={ROUTE.LOGIN} element={
                <IsUserLoggedIn user={user}>
                  <Login />
                </IsUserLoggedIn>
              }/>
            <Route path={ROUTE.FORGOTPASSWORD} element={
                <IsUserLoggedIn user={user}>
                  <ForgotPassword />
                </IsUserLoggedIn>
              }/>
            <Route path={ROUTE.SIGN_UP} element={
                <IsUserLoggedIn>
                  <SignUp />
                </IsUserLoggedIn>
              }/>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}