import AddComment from "./AddComment";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [commentsLarYawnaOnasiniEmmasin, setComments] = useState(allComments);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {commentsLarYawnaOnasiniEmmasin.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all {commentsLarYawnaOnasiniEmmasin.length} comments
          </p>
        )}
        {commentsLarYawnaOnasiniEmmasin.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/${item.displayName}`}><span className="mr-1 font-bold">{item.displayName}</span></Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">{formatDistance(posted, Date.now())} ago</p>
      </div>
      <AddComment docId={docId} comments={commentsLarYawnaOnasiniEmmasin} setComments={setComments} commentInput={commentInput}/>
    </>
  );
};
