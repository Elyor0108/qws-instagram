import UserContext from "../../contextFire/user";
import React, { useContext, useState } from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import FirebaseContext from "../../firebase/firebase";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
  const { user: { uid: userId = "" }} = useContext(UserContext);
  const [toggleLiked, setToggleLikedAllLikes] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggleLikedAllLikes((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <div onClick={handleToggleLiked} className='cursor-pointer'>
            {toggleLiked ? (
              <RiHeartFill className="text-red-600 text-4xl" />
            ) : (
              <RiHeartLine className="text-4xl" />
            )}
          </div>
          <BiMessageRoundedAdd className="text-4xl mt-[2px] ml-3" onClick={handleFocus}/>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">{likes === 1 ? `${likes} like` : `${likes} likes`}</p>
      </div>
    </>
  );
};
