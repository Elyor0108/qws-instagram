import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "../firebase/firebaseGET";

const SearchBar = ({ searchInput }) => {
  const [users, setUsers] = useState([]);
  const [filteredItems, setFilteredItemsFillter] = useState([]);

  const getUsers = async () => {
    const result = await getAllUsers();
    setUsers(result);
  };

  const searchUsers = () => {
    if (searchInput.trim()) {
      const filteredArray = users.filter((item) =>
        item.username.toLowerCase().includes(searchInput.toLowerCase())
      );

      setFilteredItemsFillter(filteredArray);
    } else {
      setFilteredItemsFillter([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    searchUsers();
  }, [searchInput]);

  return (
    <div className={!filteredItems.length && "h-full"}>
      {!filteredItems.length && (
        <div className="flex items-center justify-center h-full">
          <p className="font-semibold">User not found!</p>
        </div>
      )}
      {filteredItems.map((profile) => (
        <Link to={`/${profile.username}`}>
          <div
            key={profile.userId}
            className="flex items-center cursor-pointer mb-4"
          >
            <div className="w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src={profile.avatarSrc}
                alt="fdsa"
              />
            </div>
            <div className="ml-2">
              <span className="font-semibold">{profile.username}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchBar;
