import React, { memo } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ name, lastname, photo }) =>
  !name || !lastname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/${name}`} className="grid p-4 grid-cols-4 gap-4 mr-5 mb-6 items-center">
      <div className="flex items-center justify-between p-1  rounded-full border-2  border-green-600 col-span-1 w-20 h-20">
        <img className="rounded-full w-full h-full" src={photo} alt="fdas" onError={(e) => {e.target.src = "/images/avatars/default/.jpg"; }}/>
      </div>
      <div className="p-8 col-span-3">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-sm">{lastname}</p>
      </div>
    </Link>
  );

export default memo(User);
