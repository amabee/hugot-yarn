"use client";
import { IMAGELINK, PROFILE } from "@/globals/endpoints";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/globals/swal";

const Navbar = ({ firstname, lastname, image, username, email, id }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [updatedFirstname, setUpdatedFirstname] = useState(firstname);
  const [updatedLastname, setUpdatedLastname] = useState(lastname);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedPassword, setUpdatedPassword] = useState("");

  const handleLogOut = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleClose = () => setShowModal(false);

  const handleShow = () => {
    setUpdatedFirstname(firstname);
    setUpdatedLastname(lastname);
    setUpdatedEmail(email);
    setUpdatedImage(null);
    setUpdatedPassword("");
    setShowModal(true);
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("operation", "updateProfile");
      formData.append(
        "json",
        JSON.stringify({
          firstname: updatedFirstname,
          lastname: updatedLastname,
          email: updatedEmail,
          username: username,
          password: updatedPassword,
          userid: id,
        })
      );

      if (updatedImage) {
        formData.append("image", updatedImage);
      } else {
        formData.append("image", image);
      }

      const res = await axios({
        url: PROFILE,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          SUCCESS_MESSAGE(
            "Profile Updated!",
            "In order for update to take effect, you will be signed out first and you must relogin",
            () => {
              sessionStorage.clear();
              router.push("/");
            }
          );
        } else {
          ERROR_MESSAGE("Error", "Something went wrong updating the profile");
          console.log(res.data);
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.statusText}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  };

  return (
    <div className="left-flex-container flex-item">
      <div className="nav-links">
        <ul>
          <li className="nav-items logo">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="nav-items current-page">
            <a href="#">
              <i className="fas fa-home"></i> Home
            </a>
          </li>
          <li className="nav-items">
            <a href="#">
              <i className="far fa-bell"></i> Notifications
            </a>
          </li>
          <li className="nav-items">
            <a href="#">
              <i className="far fa-envelope"></i> Messages
            </a>
          </li>
          <li className="nav-items">
            <a href="#">
              <i className="far fa-bookmark"></i> Bookmarks
            </a>
          </li>
          <li className="nav-items">
            <a href="#" onClick={handleShow}>
              <i className="far fa-user"></i> Profile
            </a>
          </li>
        </ul>
      </div>

      <div className="profile-box">
        <img src={IMAGELINK + image} alt="profile" />
        <div className="profile-link">
          <p className="full-name">
            {firstname} {lastname}
          </p>
          <p className="user-name">@{username}</p>
        </div>
        <Dropdown>
          <Dropdown.Toggle as="a" href="#"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleLogOut()}>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Profile Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="text-center">
              <img
                src={IMAGELINK + image}
                alt="profile"
                style={{ width: "100px", borderRadius: "50%" }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={updatedFirstname}
                onChange={(e) => setUpdatedFirstname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={updatedLastname}
                onChange={(e) => setUpdatedLastname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={updatedPassword}
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) => setUpdatedImage(e.target.files[0])}
              />
            </div>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navbar;
