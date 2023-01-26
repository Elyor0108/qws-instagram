import React, { useState } from "react";
import { Link } from "react-router-dom";
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from "../../firebase/firebaseGET";

export default function SuggestedProfile({ profileDocId, username, profileId, userId, loggedInUserDocId, profileImage,}){
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
  };
  console.log(profileImage);
  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-full border-3  border-green-600">
          <img className="p-[2px] border-red-300 rounded-full w-full h-full" src={profileImage}
          />
        </div>
        <Link className="ml-2" to={`/${username}`}><p className="font-bold text-sm">{username}</p></Link>
      </div>
      <div>
        <button className="text-xs font-semibold py-1 px-4 rounded-full bg-blue-600 text-white" type="button" onClick={handleFollowUser}>
          Follow
        </button>
      </div>
    </div>
  ) : null;
};
