import { isEmpty } from "lodash";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
const Footer = () => {
  const navigate = useNavigate();
  let { user, setGameFooter, gameFooter } = useContext(AuthProvider);
  return (
    <div>
      {/* {gameFooter && (
        <div className="lobby" data-v-2a94eb60="" data-v-5f5b6ef7="">
          <div className="gmnheader" data-v-302cf84b="" data-v-2a94eb60="">
            <div className="header__img" data-v-302cf84b="">
              <div className="header__img__title" data-v-302cf84b="">
                <picture
                  className="pictureClass"
                  data-v-28fc9a52=""
                  data-v-302cf84b=""
                >
                  <img
                    className="icon-promote"
                    src={process.env.REACT_APP_URL + "/assets/images/icon-title.webp"}
                    alt=""
y
                  />
                </picture>
                <span className="header__number" data-v-302cf84b="">
                  2
                </span>
              </div>
            </div>

            <div className="header__close" data-v-302cf84b="">
              <img
                className="icon-promote"
                src={process.env.REACT_APP_URL + "/assets/images/icon-close.webp"}
                onClick={() => setGameFooter(false)}
                alt=""

              />
            </div>
          </div>
        </div>
      )} */}
      <nav>
        <ul className="">
          {/* <li id="mini" className="game-nav">
            <a
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setGameFooter(true);
                } else {
                  navigate("/login");
                }
              }}
              neua="Sports"
              className="ui-link"
            >
              <img
                className="icon-promote"
                src={process.env.REACT_APP_URL + "/assets/images/home/promot.gif"}
                alt=""
              // src={process.env.REACT_APP_URL + '/yourPathHere.jpg' }
              />
              Sports
            </a>
          </li> */}

          <li id="home" className={window.location.pathname == '/' ? "select main-nav" : ""}>
            <Link to="/" neua="Home" className="ui-link">
              <img
                className="icon-home"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              Home
            </Link>
          </li>

          <li id="casino" className={window.location.pathname == '/casino-games' ? "select main-nav" : ""}>
            <Link to="/casino-games" neua="Sports" className="ui-link">
              <img
                className=""
                src={process.env.REACT_APP_URL + "/assets/images/home/casinoFooter.webp"}
                alt=""
              // src={process.env.REACT_APP_URL + '/yourPathHere.jpg' }
              />
              Casino
            </Link>
          </li>

          <li id="sports" className={window.location.pathname == '/sports' ? "select main-nav" : ""}>
            <Link to="/sports" neua="Sports" className="ui-link">
              <img
                className="icon-sports"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              // src={process.env.REACT_APP_URL + '/yourPathHere.jpg' }
              />
              Sports
            </Link>
          </li>

          {/* <li id="inPlay">
            <Link to="/inplay" neua="In-Play" className="ui-link">
              <img
                className="icon-inplay"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              In-Play
            </Link>
          </li> */}

          <li id="support">
            <Link to={"http://Wa.me/+917899413279"} target="_blank" neua="Multi Markets" className="ui-link">
              <img
                className="icon-pin"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              Support
            </Link>
          </li>
          <li id="account" className={window.location.pathname == '/profile' ? "select main-nav" : ""}>
            <Link to={user ? "/profile" : "/login"}>
              <img
                className="icon-account"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              {!isEmpty(user) ? "Account" : "Login"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
