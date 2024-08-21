"use client";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = () => {
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
            <a href="#">
              <i className="far fa-user"></i> Profile
            </a>
          </li>
        </ul>
      </div>

      <div className="profile-box">
        <img src="./img/profile.jpg" alt="profile" />
        <div className="profile-link">
          <p className="full-name">Profile</p>
          <p className="user-name">@username</p>
        </div>
        <Dropdown>
          <Dropdown.Toggle as="a" href="#"></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
