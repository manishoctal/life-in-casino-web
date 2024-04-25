import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import All_overlay from "../components/All_overlay";
import AuthProvider from "../context/AuthContext";
import { Link } from "react-router-dom";

function Profile() {
  let { logoutUser, user } = useContext(AuthProvider);
  let token = localStorage.getItem("token") || "";
  // console.log(`${process.env.REACT_APP_URL}my-profile/mobile/${token}`,"=========")
  //   let temp =
  //     "http://sabaexch.com/my-profile/mobile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjg3ZjY1NzA0N2JhYWMwMGY5MjRhZSIsInVzZXJUeXBlIjoidXNlciIsImNyZWF0ZWRCeUlkIjoiNjNmODdmMjc3MDQ3YmFhYzAwZjkyNDFhIiwiYXV0aG9yaXR5IjoxLCJlbWFpbCI6Imxva3VAbWFpbGluYXRvci5jb20iLCJ1bmlxdWVJZCI6IjU4ODkuMjk5ODQ0NTMzOTgiLCJ1c2VybmFtZSI6Imxva3V1c2VybTEiLCJwaG9uZSI6OTk5OTk5OTk5LCJmaXJzdE5hbWUiOiJsb2t1IiwibGFzdE5hbWUiOiJVc2VyIiwid2Vic2l0ZSI6bnVsbCwidGltZVpvbmUiOiJBc2lhL0tvbGthdGEiLCJiZXRzQmxvY2tlZCI6ZmFsc2UsInRvdGFsQ29pbnMiOjE3MjQxLjE2LCJjYXNpbm9Db2lucyI6MCwiYWVDYXNpbm9Vc2VySWQiOiJsb2t1dXNlcm0xIiwiZXhwb3N1cmUiOjM2OCwic3RhdHVzIjoiYWN0aXZlIn0sImlhdCI6MTY3ODM2NjA3MSwiZXhwIjoxNjc4NDUyNDcxfQ.m27dt7FG4AXsla9DxtrctNDHkRvJ1P7KeWkAEUNikII";
  //  let temp2 = "http://localhost:7002/my-profile/mobile/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZjg3ZjY1NzA0N2JhYWMwMGY5MjRhZSIsInVzZXJUeXBlIjoidXNlciIsImNyZWF0ZWRCeUlkIjoiNjNmODdmMjc3MDQ3YmFhYzAwZjkyNDFhIiwiYXV0aG9yaXR5IjoxLCJlbWFpbCI6Imxva3VAbWFpbGluYXRvci5jb20iLCJ1bmlxdWVJZCI6Ijc0NzMuNzE3MDM0NzQ5MTgzIiwidXNlcm5hbWUiOiJsb2t1dXNlcm0xIiwicGhvbmUiOjk5OTk5OTk5OSwiZmlyc3ROYW1lIjoibG9rdSIsImxhc3ROYW1lIjoiVXNlciIsIndlYnNpdGUiOm51bGwsInRpbWVab25lIjoiQXNpYS9Lb2xrYXRhIiwiYmV0c0Jsb2NrZWQiOmZhbHNlLCJ0b3RhbENvaW5zIjoxNzI0MS4xNiwiY2FzaW5vQ29pbnMiOjAsImFlQ2FzaW5vVXNlcklkIjoibG9rdXVzZXJtMSIsImV4cG9zdXJlIjozNjgsInN0YXR1cyI6ImFjdGl2ZSJ9LCJpYXQiOjE2NzgzNjY1MzgsImV4cCI6MTY3ODQ1MjkzOH0.1DLRYLJFsG-BzM86RbnQovqIAaQR_1xyU_qSuBv1S1c"
  //   // console.log(temp.split("/"), "temp");
  //   console.log(temp2.split("/")[3],temp2.split("/")[4], "temp2");
  return (
    <>
      <All_overlay />

      <div className="mian-wrap">
        <div className="path-wrap">
          <p className="account-id">
            <span>{user ? user?.user?.username : ""}</span>
            <span className="time-zone">{user ? user?.user?.timeZoneOffset : ""}</span>
          </p>
        </div>

        <ul className="menu-list">
          <li className="">
            <Link
              to={`/my-profile`}
            // target="_blank"
            >
              My Profile
            </Link>
          </li>

          <li className="">
            <Link
              to={`/balance`}
            // target="_blank"
            >
              Balance Overview
            </Link>
          </li>
          <li className="">
            <Link
              to={`/mybets`}
            // target="_blank"
            >
              My Bets
            </Link>
          </li>
          <li className="">
            <Link
              to={`/betshistory`}
            // target="_blank"
            >
              Bets History
            </Link>
          </li>

          <li className="">
            <Link
              to={`/profit_loss`}
            // target="_blank"
            >
              Profit &amp; Loss
            </Link>
          </li>

          <li className="">
            <Link
              to={`/account-statement`}
            // target="_blank"
            >
              Account Statement
            </Link>
          </li>
          {process.env.REACT_APP_ENABLE_PAYMENT == 'true' && <> <li className="">
            <Link
              to={"/recharge"}
              state={{ from: 'deposit' }}
            >
              Make Deposit
            </Link>
          </li>
            <li className="">
              <Link
                to={"/recharge"}
                state={{ from: 'withdraw' }}
              >
                Make Withdraw Request
              </Link>
            </li>
            <li className="">
              <Link
                to={"/withdraw-requests"}
                state={{ from: 'withdraw' }}
              >
                My Withdraw Requests
              </Link>
            </li></>
          }

          {/* <li className="">
            <a
              href={`${process.env.REACT_APP_URL}activity-logs`}
            // target="_blank"
            >
              Activity Log
            </a>
          </li> */}

        </ul>

        <Button
          style={{ width: "100%" }}
          onClick={() => logoutUser()}
          id="logout"
          className="logout"
        >
          LOGOUT
        </Button>
      </div>
    </>
  );
}

export default Profile;
