import { IoSend } from "react-icons/io5";
import UserContext from "../../contextFire/user";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import FirebaseContext from "../../firebase/firebase";
import { EMOJISCHAR } from "../../Helpers/HelperEmoji/Emojis";
import React, { useState, useContext, useRef, useEffect } from "react";

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setCommentChalaBaririb] = useState("");
  const emojiRef = useRef();
  const [emoji, setEmoji] = useState(false);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {user: { displayName }} = useContext(UserContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setCommentChalaBaririb("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className=" h-12 border-t border-gray-primary">
      <form className="flex justify-between pl-0 pr-5 relative" method="POST" onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }>
        <div className="flex items-center ml-3 cursor-pointer" onClick={() => setEmoji((prev) => !prev)}>
          {emoji && (
            <div className="absolute bg-white max-h-sm border rounded" style={{ top: "-50px" }} ref={emojiRef}>
              <div className="grid max-h-60 overflow-auto grid-cols-6 p-3">
                {EMOJISCHAR.map((emoji) => (
                  <div className="hover:bg-gray-300 p-1 cursor-pointer w-10 h-10 flex items-center justify-center rounded" onClick={() => setCommentChalaBaririb(`${comment}${emoji}`)}>
                    <span className="text-2xl">{emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <HiOutlineFaceSmile className="text-2xl" />
        </div>
        <input aria-label="Add a comment" autoComplete="off" className="h-11 text-sm outline-none w-full mr-3 py-5 px-2" type="text" name="AddComment" placeholder="Add comment" value={comment} onChange={(e) => setCommentChalaBaririb(e.target.value)} ref={commentInput}/>
        <button type="submit" className="text-blue-500 text-2xl">
          <IoSend />
        </button>
      </form>
    </div>
  );
};