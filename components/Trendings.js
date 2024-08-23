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
  const [isSearching, setIsSearching] = useState(false);
  const [isDisplay, setIsDisplay] = useState("block");

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

  useEffect(() => {
    handleDisplayChange();
  }, [isSearching]);

  const handleDisplayChange = () => {
    setIsDisplay(isSearching ? "none" : "block");
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSelect = (user) => {
    setQuery(user.username);
    setShowDropdown(false);
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

  return (
    <div className="right-flex-container flex-item">
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search Twitter"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setShowDropdown(true);
            setIsSearching(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowDropdown(false);
              setIsSearching(false);
            }, 200);
          }}
        />
        {showDropdown && users.length > 0 && (
          <div className="dropdown-menu show" style={{ zIndex: 9999 }}>
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

      <div className="trends" style={{ display: isDisplay }}>
        <ul>
          <li className="nav-list header" />
          <h2>Trends for you</h2>
          <i className="fas fa-cog"></i>
          <li className="nav-list">
            <div className="trend-list">
              <p className="sub-text">Trending in Naija</p>
              <p className="main-text">#BBNaija</p>
              <p className="sub-text">274K Tweets</p>
            </div>
            <div className="trend-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </li>
          <li className="nav-list">
            <div className="trend-list">
              <p className="sub-text">Trending in Naija</p>
              <p className="main-text">#TaylorSwift</p>
              <p className="sub-text">154K Tweets</p>
            </div>
            <div className="trend-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </li>
          <li className="nav-list">
            <div className="trend-list">
              <p className="sub-text">Trending in Naija</p>
              <p className="main-text">#Lover</p>
              <p className="sub-text">135K Tweets</p>
            </div>
            <div className="trend-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </li>
          <li className="nav-list">
            <div className="trend-list">
              <p className="sub-text">Trending in Naija</p>
              <p className="main-text">#Dora</p>
              <p className="sub-text">124K Tweets</p>
            </div>
            <div className="trend-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </li>
          <li className="nav-list">
            <div className="trend-list">
              <p className="sub-text">Trending in Naija</p>
              <p className="main-text">#TGIF</p>
              <p className="sub-text">43K Tweets</p>
            </div>
            <div className="trend-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </li>
          <li className="nav-list">
            <a href="#">Show more</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Trendings;
