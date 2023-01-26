import Image from "./Image";
import Header from "./Header";
import Footer from "./Footer";
import Actions from "./Actions";
import Comments from "./Comments";
import React, { useRef } from "react";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={content.username} avatarSrc={content.avatarSrc} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus}/>
      <Footer caption={content.caption} username={content.username} />
      <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated}commentInput={commentInput}/>
    </div>
  );
};

