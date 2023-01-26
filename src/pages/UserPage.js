import { useParams, useNavigate } from "react-router-dom";
import { NOT_FOUND } from "../routes/routes";
import React, { useState, useEffect } from "react";
import { getUserByUsername } from "../firebase/firebaseGET";
import UserProfile from "../components/Profile/UserProfile.js";

export default function UserPage() {
  const { username } = useParams();
  const [user, setUserJa] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserExists = async () => {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUserJa(user);
      } else {
        navigate(NOT_FOUND);
      }
    };

    checkUserExists();
  }, [username, navigate]);

  return user ? (
    <div className="bg-gray-background mt-10">
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
};
