"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import "../../public/styles/fa-icons.css";
import "../../public/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Trendings from "@/components/Trendings";
import ToastNotification from "@/globals/toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IMAGELINK, MAIN } from "@/globals/endpoints";
import {
  ERROR_MESSAGE,
  EXCEPTION_ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "@/globals/swal";
import DOMPurify from "dompurify";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import CommentModal from "@/components/CommendModal";
import { timeAgo } from "@/globals/timeFormatter";

export default function Home() {
  const [liked, setLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserID, setCurrentUserID] = useState("");
  const [currentUserFirstname, setCurrentFirstname] = useState("");
  const [currentUserLastname, setCurrentUserLastname] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentUserUsername, setCurrentUserUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [userReactions, setUserReactions] = useState({});
  const [postID, setPostID] = useState();

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentPostComments, setCurrentPostComments] = useState([]);

  const handleShowCommentModal = (comments, postID) => {
    setCurrentPostComments(comments);
    setPostID(postID);
    setShowCommentModal(true);

    console.log(currentPostComments);
  };

  const handleCloseCommentModal = () => setShowCommentModal(false);

  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);

    if (!user) {
      router.push("/");
    } else {
      setCurrentUser(user);
      setCurrentUserID(user.userid);
      setCurrentFirstname(user.firstname);
      setCurrentUserLastname(user.lastname);
      setCurrentUserImage(user.user_image);
      setCurrentUserUsername(user.username);
    }
  }, [router]);

  useEffect(() => {}, [
    currentUser,
    currentUserID,
    currentUserImage,
    currentUserFirstname,
    currentUserLastname,
  ]);

  const getPosts = async () => {
    try {
      console.log("Request URL:", MAIN);
      console.log("Request Parameters:", {
        operation: "getPosts",
        user_id: currentUserID,
      });

      console.log("CURRENT USERID: ", currentUserID);

      const res = await axios.get(MAIN, {
        params: {
          operation: "getPosts",
          json: JSON.stringify({
            user_id: currentUserID,
          }),
        },
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          const posts = res.data.success;

          const reactions = {};
          posts.forEach((post) => {
            reactions[post.post_id] = post.user_reaction || "";
          });

          setPosts(posts);

          setUserReactions(reactions);
        } else {
          ERROR_MESSAGE(
            "Error Fetching Posts",
            "An error occured while fetching posts"
          );
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(
        "An exception error occured while fetching posts" + `${error}`
      );
    }
  };

  const addPost = async () => {
    const formData = new FormData();
    formData.append("operation", "addPost");
    formData.append(
      "json",
      JSON.stringify({
        userid: currentUserID,
        post_content: postContent,
      })
    );

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const res = await axios.post(MAIN, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          setToastTitle("Success");
          setToastMessage("Post added successfully");
          handleShowToast();
          setPostContent("");
          setSelectedImage(null);
        } else {
          ERROR_MESSAGE("Error Posting", JSON.stringify(res.data));
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(
        "An exception error occurred while adding the post" + `${error}`
      );
    }
  };

  const likePost = async (postID) => {
    const currentReaction = userReactions[postID];
    const newReaction = currentReaction === "heart" ? "" : "heart";

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.post_id === postID
          ? {
              ...post,
              total_reactions: newReaction
                ? post.total_reactions + 1
                : post.total_reactions - 1,
            }
          : post
      )
    );

    setUserReactions((prevReactions) => ({
      ...prevReactions,
      [postID]: newReaction,
    }));

    const formData = new FormData();
    formData.append("operation", "reactToPost");
    formData.append(
      "json",
      JSON.stringify({
        userid: currentUserID,
        post_id: postID,
        reaction: newReaction,
      })
    );

    try {
      const res = await axios({
        url: MAIN,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        if (!res.data.success) {
          ERROR_MESSAGE("Error", "Something went wrong while reacting to post");
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(`${error}`);
    }
  };

  const getComment = async (postID) => {
    try {
      console.log("Post ID Passed: ", postID);
      const res = await axios.get(MAIN, {
        params: {
          operation: "getComment",
          json: JSON.stringify({
            post_id: postID,
          }),
        },
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          handleShowCommentModal(res.data.comments, postID);
        } else {
          ERROR_MESSAGE("Error", "Something went wrong fetching comments");
          console.log("Comment Error: ", res.data);
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.staus}`);
      }
    } catch (error) {}
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  function cleanAndFormatContent(dirty) {
    const sanitizedContent = DOMPurify.sanitize(dirty);
    const formattedContent = sanitizedContent.replace(
      /#(\w+)/g,
      '<span class="hashtag">#$1</span>'
    );
    return formattedContent;
  }

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  useEffect(() => {
    if (currentUserID) {
      getPosts();
    }
  }, [currentUserID]);

  return (
    <body>
      <div className="main-flex-container">
        <Navbar
          firstname={currentUserFirstname}
          lastname={currentUserLastname}
          username={currentUserUsername}
          image={currentUserImage}
        />

        <div className="center-flex-container flex-item">
          <div className="home">
            <h1>Home</h1>
            <i className="fas fa-magic"></i>
          </div>

          <div className="post-tweet">
            <form action="">
              <div className="form-group-1">
                <img
                  src={IMAGELINK + currentUserImage}
                  alt="profile-pics"
                  style={{ objectFit: "cover" }}
                />
                <input
                  type="text"
                  placeholder="Got any hugot?..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>

              <div className="form-group-2">
                <button
                  type="button"
                  onClick={handleFileButtonClick}
                  className=" btn btn-primary"
                  style={{ marginLeft: "2.5rem" }}
                >
                  <i className="far fa-image"></i>
                </button>
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    style={{ borderRadius: 0, height: 150, width: 150 }}
                    className="img-fluid rounded ms-start"
                  />
                ) : (
                  ""
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />

                <button
                  className="btn ms-auto"
                  type="button"
                  onClick={() => addPost()}
                >
                  Tweet
                </button>
              </div>
            </form>
          </div>

          {posts.map((post) => (
            <div key={post.post_id} className="tweets">
              <div className="user-pics">
                <img src={IMAGELINK + post.user_image} alt="user3" />
              </div>
              <div className="user-content-box">
                <div className="user-names">
                  <hi className="full-name">
                    {post.firstname} {post.lastname}
                  </hi>
                  <p className="user-name">@{post.username}</p>
                  <p className="time"> · {timeAgo(post.created_at)}</p>
                  <i
                    className="fas fa-chevron-down ms-auto"
                    style={{ marginLeft: 0, marginRight: 10, color: "black" }}
                  />
                </div>

                <div className="user-content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: cleanAndFormatContent(post.post_content),
                    }}
                  />
                  {post.image ? <img src={IMAGELINK + post.image} /> : ""}
                </div>

                <div className="content-icons">
                  <i
                    className="far fa-comment blue"
                    onClick={() => getComment(post.post_id)}
                  >
                    {post.total_comments}
                  </i>
                  <i className="fas fa-retweet green"> {post.total_shares}</i>
                  {/* Heart Icon */}
                  <i
                    className={
                      userReactions[post.post_id] === "heart"
                        ? "fas fa-heart red"
                        : "far fa-heart"
                    }
                    style={
                      userReactions[post.post_id] === "heart"
                        ? { color: "red", cursor: "pointer" }
                        : { color: "gray", cursor: "pointer" }
                    }
                    onClick={() => likePost(post.post_id)}
                  >
                    {post.total_reactions}
                  </i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ToastNotification
          show={showToast}
          onClose={handleCloseToast}
          title={toastTitle}
          message={toastMessage}
        />

        <Trendings currentID={currentUserID} />

        <CommentModal
          show={showCommentModal}
          handleClose={handleCloseCommentModal}
          comments={currentPostComments}
          onClose={handleCloseCommentModal}
          userid={currentUserID}
          post_id={postID}
        />
      </div>
    </body>
  );
}
