import React from "react";

const Trendings = () => {
  return (
    <div class="right-flex-container flex-item">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Search Twitter" />
      </div>

      <div class="trends">
        <ul>
          <li class="nav-list header">
            <h2>Trends for you</h2>
            <i class="fas fa-cog" />
          </li>
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

      <div class="right-footer">
        <div class="footer-links">
          <a href="#" class="sub-text">
            Terms
          </a>
          <a href="#" class="sub-text">
            Privacy policy
          </a>
          <a href="#" class="sub-text">
            Ads info
          </a>
          <a href="#" class="sub-text">
            more
          </a>
          <i class="fas fa-chevron-down sub-text"></i>
        </div>
        <div class="footer-copyright">
          <p class="sub-text">&copy; 2020 Twitter, Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Trendings;
