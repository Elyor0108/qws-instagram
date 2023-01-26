import React from "react";
import User from "./User";
import Suggestions from "./Suggestions";
import useUser from "../../Helpers/AllHooks/useUser"

const Sidebar = () => {
  const {user: { docId, fullName, username, userId, following, avatarSrc }} = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} avatarSrc={avatarSrc} />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/>
    </div>
  );
};

export default Sidebar;
