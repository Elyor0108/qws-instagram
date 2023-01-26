import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";
import React, { useState, useEffect } from "react";
import { getSuggestedProfiles } from "../../firebase/firebaseGET";

export default function Suggestions({ userId, following, loggedInUserDocId }){
  const [profiles, setProfilesOnasiniEmsin] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfilesOnasiniEmsin(response);
    }
    if (userId) suggestedProfiles();
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} />
  ) : profiles.length ? (
    <div className="rounded flex flex-col">
      <div className="flex items-center my-3 w-full">
        <div className="border-b-[1px] border-black h-0 w-full"></div>
      </div>
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base"></p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile key={profile.docId} profileImage={profile.avatarSrc} profileDocId={profile.docId} username={profile.username} profileId={profile.userId} userId={userId} loggedInUserDocId={loggedInUserDocId}/>
        ))}
      </div>
    </div>
  ) : null;
};
