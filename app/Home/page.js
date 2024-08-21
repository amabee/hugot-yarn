"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import "../../public/styles/fa-icons.css";
import "../../public/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Trendings from "@/components/Trendings";
import ToastNotification from "@/globals/toast";

export default function Home() {
  const [liked, setLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const toggleLike = () => {
    setLiked(!liked);
  };

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <body>
      <div className="main-flex-container">
        <Navbar />

        <div className="center-flex-container flex-item">
          <div className="home">
            <h1>Home</h1>
            <i className="fas fa-magic"></i>
          </div>

          <div className="post-tweet">
            <form action="">
              <div className="form-group-1">
                <img
                  src="/images/maloi.jpg"
                  alt="profile-pics"
                  style={{ objectFit: "cover" }}
                />
                <input type="text" placeholder="Got any hugot?..." />
              </div>
              <div className="form-group-2">
                <div className="post-icons">
                  <i className="far fa-image"></i>
                </div>
                <button
                  className="btn"
                  type="button"
                  onClick={() => handleShowToast()}
                >
                  Tweet
                </button>
              </div>
            </form>
          </div>
          <div className="tweets">
            <div className="user-pics">
              <img src="./img/user3.jpg" alt="user3" />
            </div>
            <div className="user-content-box">
              <div className="user-names">
                <hi className="full-name">Olivia Brent</hi>
                <p className="user-name">@iamolivia</p>
                <p className="time"> . 58mins</p>
              </div>

              <div className="user-content">
                <p>
                  We've gotta send kids back to school so one day they can be
                  doctors and scientists, and everyone can ignore them.
                </p>
                <img src="/images/maloi.jpg" />
              </div>

              <div className="content-icons">
                <i className="far fa-comment blue"> 109</i>
                <i className="fas fa-retweet green"> 865</i>
                {/* Heart Icon */}
                <i
                  className={liked ? "fas fa-heart red" : "far fa-heart"}
                  style={
                    liked
                      ? { color: "red", cursor: "pointer" }
                      : { color: "gray", cursor: "pointer" }
                  }
                  onClick={toggleLike}
                >
                  {" "}
                  1.6k
                </i>
                {/* <i className="fas fa-chevron-up blue"></i> */}
              </div>
            </div>
          </div>
        </div>
        <ToastNotification
          show={showToast}
          onClose={handleCloseToast}
          title={toastTitle}
          message={toastMessage}
        />

        <Trendings />
      </div>
    </body>
  );
}
