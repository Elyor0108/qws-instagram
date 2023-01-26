import { Link } from "react-router-dom";

export default function Header({ username, avatarSrc }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/${username}`} className="flex items-center">
          <img className="rounded-full border-green-600 border-2 h-8 w-8 flex mr-3" src={avatarSrc} alt={`${username}`}/>
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};
