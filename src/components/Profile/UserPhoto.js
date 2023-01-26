import "../styles/profile.css";
import FooterModal from "./FooterModal";
import MenuSvg from "../../icons/MenuSvg";
import CloseSvg from "../../icons/CloseSvg";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../contextFire/user";
import { UserProfileContext } from "./UserProfile";
import UserPhotoModalComments from "./UserComments";
import UserPhotoModalPost from "./UserPhotoModalPost";
import { storage } from "../../firebase/firebaseConfig";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import React, { useEffect, useState, useContext } from "react";
import { ref, deleteObject } from "firebase/storage";
import {deletePhotoByDocId,getPhotosByPhotoId,getUserByUserId,} from "../../firebase/firebaseGET";

const UserPhotoModal = ({ showModal, setShowModal, photo }) => {
  const [post, setPost] = useState();
  const [user, setUser] = useState({});
  const [modalPost, setModalPost] = useState(false);
  const { user: currentUser } = useContext(UserContext);
  const { getProfileInfoAndPhotos } = useContext(UserProfileContext);

  const getPhotoInformation = async () => {
    const result = await getPhotosByPhotoId(currentUser.uid, photo.photoId);
    setPost(result);
  };

  const getCurrentUser = async () => {
    if (photo.userId) {
      const [result] = await getUserByUserId(photo.userId);
      setUser(result);
    }
  };

  const deletePost = async () => {
    await deletePhotoByDocId(photo.docId);
    const storageRef = storage.refFromURL(photo.imageSrc);
    const fullPath = storageRef.f 
    const age = age();
    const storageImage = age;
    const desertRef = ref(storageImage, fullPath);

    deleteObject(desertRef)
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.log(error.message);
      });
    setModalPost(false);
    setShowModal(false);
    getProfileInfoAndPhotos();
  };

  useEffect(() => {
    getCurrentUser();
    if (photo.photoId) {
      getPhotoInformation();
    }
  }, [photo.userId]);

  return (
    <>
      {showModal ? (
        <>
          <RemoveScrollBar />
          {modalPost && (<UserPhotoModalPost setShowModal={setModalPost} deletePost={deletePost}/>)}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div onClick={() => setShowModal(false)} style={{ zIndex: 10000 }} className="absolute top-5 right-5 cursor-pointer">
              <CloseSvg />
            </div>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div>
                  <div className="flex items-center justify-center" style={{ height: 400, width: 600 }} >
                    <div className="flex justify-center">
                      <div className="flex justify-center">
                        {photo.imageSrc ? (<img src={photo.imageSrc} alt={""} class="image" />
                        ) : (<Skeleton count={1} height={750} width={540} />)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center pb-2 mt-1">
                      <div className="flex items-center ml-3">
                        <div className="w-8 h-8">
                          <img className="rounded-full cursor-pointer w-full h-full flex mr-3" src={user.avatarSrc}/>
                        </div>
                        <div>
                          <span className="ml-4">{user.username}</span>
                        </div>
                      </div>
                      <div className="ml-10">
                        <div className="cursor-pointer" onClick={() => setModalPost(true)} >
                          <MenuSvg />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="mt-2 ml-3 pl-3 overflow-auto max-h-96">
                      {post && (<UserPhotoModalComments photo={post} setShowModal={setShowModal}/>)}
                    </div>
                    <div className="w-92 p-20 flex flex-col justify-between" style={{ width: "500px" }}>
                      <div className=" w-full absolute bottom-0 left-0">
                        {post && <FooterModal post={post} setPost={setPost} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default UserPhotoModal;
