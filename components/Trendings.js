import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/dropdown-style.css";
import {
  ERROR_MESSAGE,
  EXCEPTION_ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "@/globals/swal";
import axios from "axios";
import { IMAGELINK, MAIN } from "@/globals/endpoints";

const Trendings = ({ currentID }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query) {
      const searchUser = async () => {
        try {
          const res = await axios.get(MAIN, {
            params: {
              operation: "searchUser",
              json: JSON.stringify({
                username: query,
                currentUserId: currentID,
              }),
            },
          });

          if (res.status === 200) {
            if (res.data !== null && res.data.success) {
              setUsers(res.data.success);
            } else {
              ERROR_MESSAGE("Error Fetching Users", JSON.stringify(res.data));
            }
          } else {
            ERROR_MESSAGE("Status Error", `${res.status}`);
          }
        } catch (error) {
          EXCEPTION_ERROR_MESSAGE(`${error}`);
        }
      };

      searchUser();
    } else {
      setUsers([]);
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const followUser = async (followed_id) => {
    const formData = new FormData();
    formData.append("operation", "followUser");
    formData.append(
      "json",
      JSON.stringify({
        user_id: currentID,
        followed_user_id: followed_id,
      })
    );

    try {
      const res = await axios({
        url: MAIN,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          SUCCESS_MESSAGE("Success", "You are now following this person");
        } else {
          ERROR_MESSAGE("Error following the user", JSON.stringify(res.data));
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(`${error}`);
    }
  };

  const UnfollowUser = async (followed_id) => {
    const formData = new FormData();
    formData.append("operation", "unfollowUser");
    formData.append(
      "json",
      JSON.stringify({
        user_id: currentID,
        followed_user_id: followed_id,
      })
    );

    try {
      const res = await axios({
        url: MAIN,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          SUCCESS_MESSAGE("Success", "You are now not following this person");
        } else {
          ERROR_MESSAGE("Error following the user", JSON.stringify(res.data));
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      EXCEPTION_ERROR_MESSAGE(`${error}`);
    }
  };

  const handleSelect = (user) => {
    setQuery(user.username);
    setShowDropdown(false);
  };

  return (
    <div className="right-flex-container flex-item">
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search Twitter"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        {showDropdown && users.length > 0 && (
          <div className="dropdown-menu show">
            {users.map((user) => (
              <div
                key={user.id}
                className="dropdown-item"
                onClick={() => handleSelect(user)}
              >
                <img
                  src={IMAGELINK + user.user_image}
                  alt={user.username}
                  className="dropdown-item-image"
                />
                <span>{user.username}</span>

                {user.userid !== currentID ? (
                  user.is_following ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="float-end"
                      onClick={() => UnfollowUser(user.userid)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="float-end"
                      onClick={() => followUser(user.userid)}
                    >
                      Follow
                    </Button>
                  )
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      <div class="trends">
        <ul>
          <li class="nav-list header" />
          <h2>Trends for you</h2>
          <i class="fas fa-cog"></i>
          <li class="nav-list">
            <div class="trend-list">
              <p class="sub-text">Trending in Naija</p>
              <p class="main-text">#BBNaija</p>
              <p class="sub-text">274K Tweets</p>
            </div>
            <div class="trend-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </li>
          <li class="nav-list">
            <div class="trend-list">
              <p class="sub-text">Trending in Naija</p>
              <p class="main-text">#TaylorSwift</p>
              <p class="sub-text">154K Tweets</p>
            </div>
            <div class="trend-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </li>
          <li class="nav-list">
            <div class="trend-list">
              <p class="sub-text">Trending in Naija</p>
              <p class="main-text">#Lover</p>
              <p class="sub-text">135K Tweets</p>
            </div>
            <div class="trend-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </li>
          <li class="nav-list">
            <div class="trend-list">
              <p class="sub-text">Trending in Naija</p>
              <p class="main-text">#Dora</p>
              <p class="sub-text">124K Tweets</p>
            </div>
            <div class="trend-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </li>
          <li class="nav-list">
            <div class="trend-list">
              <p class="sub-text">Trending in Naija</p>
              <p class="main-text">#TGIF</p>
              <p class="sub-text">43K Tweets</p>
            </div>
            <div class="trend-icon">
              <i class="fas fa-chevron-down"></i>
            </div>
          </li>

          <li class="nav-list">
            <a href="#">Show more</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Trendings;
