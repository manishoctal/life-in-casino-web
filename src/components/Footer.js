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

          <li id="sports">
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

          <li id="inPlay">
            <Link to="/inplay" neua="In-Play" className="ui-link">
              <img
                className="icon-inplay"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              In-Play
            </Link>
          </li>

          <li id="home" className="select main-nav">
            <Link to="/" neua="Home" className="ui-link">
              <img
                className="icon-home"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              Home
            </Link>
          </li>

          <li id="multiMarket">
            <Link to="/multimarket" neua="Multi Markets" className="ui-link">
              <img
                className="icon-pin"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              Multi Markets
            </Link>
          </li>
          <li id="account">
            <Link to={user ? "/profile" : "/login"}>
              <img
                className="icon-account"
                src={process.env.REACT_APP_URL + "/assets/images/home/transparent.gif"}
                alt=""
              />
              Account
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Footer;
