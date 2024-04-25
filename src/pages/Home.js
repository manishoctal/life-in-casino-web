import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import obj from "../Utils/helpers";
import { toast } from "wc-toast";
function Home() {
  const [inplayCountData, setInplayCountData] = useState({});
  const [vendors, setVendors] = useState();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  let { isLoged, setIsLoged, setCasinoModel, setCasinoObj, user, setVendor, setLoader, user_coins, setCasinoGameUrl } =
    useContext(AuthProvider);
  const inPlayCount = async () => {
    const { status, data: response_users } = await apiGet(apiPath.inPlayCount);
    if (status === 200) {
      if (response_users.success) {
        if (response_users.results) {
          setInplayCountData(response_users.results);
        }
      }
    }
  };

  const casinoVenders = async () => {
    try {
      setLoader(true)
      const { status, data: response } = await apiGet(apiPath.casinoVendors);
      if (status === 200) {
        if (!response.error) {
          if (response.data) {
            let data = []
            if (response.data.length > 0) {
              data = response.data.map((item) => {
                if (item.providerName != '') {
                  return {
                    name: item.providerName,
                    image: `/assets/images/home/${(item.providerName).toLowerCase()}.jpeg`
                  }
                }
                else {
                  return {
                    name: item.providerName,
                    image: "/assets/images/home/vendor.png"
                  }
                }
              })
            }
            setVendors([...data, {name: "Evolution Gaming", image: "/assets/images/home/evolution-gaming.jpeg"}]);
            setLoader(false)
          }
        } else {
          toast.error(response.message)
        }
      }
    } catch (error) {
      console.error('error:', error)
    }
  }

  const getSetting = async (event) => {
    try {
      const { status, data: response_users } = await apiGet(apiPath.getSetting + '?website=' + document?.location?.host);
      if (status === 200) {
        if (response_users.success) {
          setData(response_users.results);
        }
      }
    } catch (err) { }
  };

  // useEffect(() => {
  //   if (isLoged) {
  //     window.location.reload();
  //     setIsLoged(false);
  //   }
  // }, [isLoged]);
  useEffect(() => {
    inPlayCount();
    casinoVenders();
    getSetting();
    // console.log('------')
  }, []);
  return (
    <div>
      <div className="promo-viewport">
        <img
          src={
            process.env.REACT_APP_URL +
            "/assets/images/home/home_slider5.jpg"
          }
          style={{ width: "100%" }}
          alt=""
        />
      </div>
      <div id="page">
        <div className="mian-wrap">
          <div className="gamehall">
            <a href="#" neua="InPlay Banner">
              <dl className="entrance-title">
                <dt>Sports</dt>
                <dd>Play Now</dd>
              </dl>
              <dl
                id="onLiveBoard"
                onClick={() => navigate("/inplay")}
                className="on_live"
              >
                <dt>
                  <p className="live_icon">
                    <span></span> LIVE
                  </p>
                </dt>

                <dd id="onLiveCount_CRICKET">
                  <p>Cricket</p>
                  <span id="count">
                    {inplayCountData?.cricketInplayCount || 0}
                  </span>
                </dd>

                <dd id="onLiveCount_SOCCER">
                  <p>Soccer</p>
                  <span id="count">
                    {inplayCountData?.soccerInplayCount || 0}
                  </span>
                </dd>

                {/* <dd id="onLiveCount_E_SOCCER">
                  <p>E-Soccer</p>
                  <span id="count">
                    {inplayCountData?.soccerInplayCount || 0}
                  </span>
                </dd> */}

                <dd id="onLiveCount_TENNIS">
                  <p>Tennis</p>
                  <span id="count">
                    {inplayCountData?.tennisInplayCount || 0}
                  </span>
                </dd>
              </dl>
              <Link to="/inplay">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    "/assets/images/home1/sports2.png"
                  }
                  alt=""
                />
              </Link>
            </a>

            {/* <a className="entrance" href="#">
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/blog.jpg"
                }
                alt=""
              />
            </a> */}

            {vendors?.length > 0 ?
              vendors.map((item, index) => {
                if (item != '') {
                  return <a
                    key={index}
                    className="entrance"
                    href="javascript:void(0)"
                    onClick={() => {
                      if (!isEmpty(user)) {
                        if(item.name == "Evolution Gaming"){
                          setVendor("DC")
                          navigate("/casino-games", {state: {searchKey: "Evolution Top Games", vendor: "Evolution Gaming"}});
                        } else {
                          setVendor(item.name);
                          navigate("/casino-games");
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                  >
                    <dl className="entrance-title">
                      <dt>{item?.name}</dt>
                      {/* <dd>Play Now</dd> */}
                    </dl>
                    <img
                      src={
                        process.env.REACT_APP_URL +
                        item?.image
                      }
                      style={{ background: '#fff', height: '100%' }}
                      alt=""
                    />
                  </a>
                }
              })
              : ''}

            {/* <a
              className="entrance"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "SABA",
                    gameType: "VIRTUAL",
                    casinoType: "SABA-VIRTUAL-001",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Virtual Cricket</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/virtual-cricket.jpg"
                }
                alt=""
              />
            </a>
            <a
              className="entrance"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "SABA",
                    gameType: "VIRTUAL",
                    casinoType: "SABA-VIRTUAL-001",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Khul Ja Sim Sim</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/khul-ja-sim-sim.jpg"
                }
                alt=""
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "SEXYBCRT",
                    gameType: "LIVE",
                    casinoType: "MX-LIVE-007",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="AEIndia Banner"
            >
              <dl className="entrance-title">
                <dt>SEXY</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/ae_sexy_casino.jpeg"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              // onClick={() => {
              //   if (!isEmpty(user)) {
              //     setCasinoModel(true);
              //     setCasinoObj({
              //       platForm: "SEXYBCRT",
              //       gameType: "LIVE",
              //       casinoType: "livecasino",
              //     });
              //   } else {
              //     navigate("/login");
              //   }
              // }}
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "",
                    gameType: "",
                    casinoType: "",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="Casino Banner"
            >
              <dl className="entrance-title">
                <dt>Live Casino</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/live-casino.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-038",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="Blackjack Banner"
            >
              <dl className="entrance-title">
                <dt>Blackjack</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/blackjack.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "",
                    gameType: "",
                    casinoType: "",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="ROYAL Banner"
            >
              <dl className="entrance-title">
                <dt>Fast Spin</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/fast-spin.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "",
                    gameType: "",
                    casinoType: "",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="Supernowa Banner"
            >
              <dl className="entrance-title">
                <dt>Spadegaming</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/spadegamming.png"
                }
                alt=""
              />
            </a>


            <a
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "",
                    gameType: "",
                    casinoType: "",
                  });
                } else {
                  navigate("/login");
                }
              }}
              className="entrance-half"
              href="javascript:void(0)"
              neua="7Mojos Banner"
            >
              <dl className="entrance-title">
                <dt>Slot</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/slot-image.png"
                }
                alt=""
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JDB",
                    gameType: "SLOT",
                    casinoType: "JDB-SLOT-001",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="HORSEBOOK Banner"
            >
              <dl className="entrance-title">
                <dt>JDB</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/JDBC.png"
                }
                alt=""
              />
            </a>


            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-042",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="Minesweeper Banner"
            >
              <dl className="entrance-title">
                <dt>Minesweeper</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_minesweeper-half.jpg"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "E1SPORT",
                    gameType: "ESPORTS",
                    casinoType: "E1-ESPORTS-001",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="MT5 Banner"
            >
              <dl className="entrance-title">
                <dt>Esports</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/esports.jpg"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-016",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>TeenPatti 20-20</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/teen-patti.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-005",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>NumberKing</dt>
                <dd>Play Now</dd>
              </dl>
              <img

                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/Number-King.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-007",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Big small</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_BigSmall-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-010",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="32Cards Banner"
            >
              <dl className="entrance-title">
                <dt>TeenPatti Joker</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/teen-patti-guide.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-011",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="32Cards Banner"
            >
              <dl className="entrance-title">
                <dt>7up7down</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/7up7down.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-012",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Dragon &amp; Tiger</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/dragon.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-013",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Callbreak Quick</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_CallbreakQuick-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-015",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Sic Bo</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/sicbo.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-014",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Baccarat</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/bccarat.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-043",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Bonus Dice</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/bonus-dice.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-047",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Heist</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/heist.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-049",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>5 Card Poker</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_5CardPoker-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-050",
                  });
                } else {
                  navigate("/login");
                }
              }}
            >
              <dl className="entrance-title">
                <dt>Color Game</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_ColorGame-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-039",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="32Cards Banner"
            >
              <dl className="entrance-title">
                <dt>32 Cards</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_32card-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "JILI",
                    gameType: "TABLE",
                    casinoType: "JILI-TABLE-004",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="Rummy Banner"
            >
              <dl className="entrance-title">
                <dt>Rummy</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_rummy-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "",
                    gameType: "",
                    casinoType: "",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="BetGames Banner"
            >
              <dl className="entrance-title">
                <dt>BetGames</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_betgames-half.jpg"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "PP",
                    gameType: "LIVE",
                    casinoType: "PP-LIVE-043",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="AndarBahar Banner"
            >
              <dl className="entrance-title">
                <dt>Andar Bahar</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_andarBahar-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "SEXYBCRT",
                    gameType: "LIVE",
                    casinoType: "MX-LIVE-007",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
              neua="Sicbo Banner"
            >
              <dl className="entrance-title">
                <dt>Sicbo</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_sicbo-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-028",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
              neua="7Up7Down Banner"
            >
              <dl className="entrance-title">
                <dt>7 UP 7 Down</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_sevenUpDown-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-036",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
              neua="CoinToss Banner"
            >
              <dl className="entrance-title">
                <dt>Coin Toss</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_CoinToss-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-046",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
              neua="TeenPatti Banner"
            >
              <dl className="entrance-title">
                <dt>Teen Patti</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_teenPatti-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-022",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
              neua="KingMaker Banner"
            >
              <dl className="entrance-title">
                <dt>Card Matka</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_cardMatka-half.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "KINGMAKER",
                    gameType: "TABLE",
                    casinoType: "KM-TABLE-021",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
              neua="KingMaker Banner"
            >
              <dl className="entrance-title">
                <dt>Number Matka</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/number-matka.png"
                }
                alt=""
              />
            </a>

            <a
              className="entrance-half"
              // onClick={() => {
              //   if (!isEmpty(user)) {
              //     setCasinoModel(true);
              //     setCasinoObj({
              //       platForm: "",
              //       gameType: "",
              //       casinoType: "",
              //     });
              //   } else {
              //     navigate("/login");
              //   }
              // }}
              href="javascript:void(0)"
              neua="Binary Banner"
            >
              <dl className="entrance-title">
                <dt>Ludobet</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home1/ludobet.png"
                }
                alt=""
              />
            </a>
            <a
              className="entrance-half"
              href="javascript:void(0)"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "HORSEBOOK",
                    gameType: "LIVE",
                    casinoType: "HRB-LIVE-001",
                  });
                } else {
                  navigate("/login");
                }
              }}
              neua="HORSEBOOK Banner"
            >
              <dl className="entrance-title">
                <dt>HORSEBOOK</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                style={{ height: '100%' }}
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_horsebook-half.jpg"
                }
                alt=""
              />
            </a>
            <a
              className="entrance-half"
              id="pokerLoginBtn"
              neua="Bpoker Banner"
              onClick={() => {
                if (!isEmpty(user)) {
                  setCasinoModel(true);
                  setCasinoObj({
                    platForm: "",
                    gameType: "",
                    casinoType: "",
                  });
                } else {
                  navigate("/login");
                }
              }}
              href="javascript:void(0)"
            >
              <dl className="entrance-title">
                <dt>Bpoker</dt>
                <dd>Play Now</dd>
              </dl>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/banner_bpoker-half.png"
                }
                alt=""
              />
            </a> */}
          </div>

          <div className="support-wrap extend-support">
          {console.log("data?.whatsappShowing",data?.whatsappShowing)}
            {/* <div className="extend-btn">
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/transparent.gif"
                }
                title="customer"
                className="support-customer"
              />
              <a href="#">
                Customer support1
              </a>

              <a
                href="#"
                className="split-line"
              >
                support2
              </a>
            </div> */}

            {/* <div className="extend-btn">
              <img
                src="assets/images/home/transparent.gif"
                title="WhatsApp"
                className="support-whatsapp"
              />
              <a
                href="http://Wa.me/+447418602325"
                target="_blank"
              >
                +44 7418602325
              </a>
              <a
                href="http://Wa.me/+15705055756"
                target="_blank"
                className="split-line"
              >
                +1 570 5055756
              </a>
            </div>

            <div className="extend-btn">
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/transparent.gif"
                }
                title="Telegram"
                className="support-telegram"
              />
              <a href="http://t.me/PoisaBazz" target="_blank">PoisaBazz</a>

              <a href="http://t.me/PoisaBazz01" target="_blank" className="split-line">
                PoisaBazz01
              </a>
            </div>
            <div className="support-social">
              <div className="social-btn">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    "/assets/images/home/fb-icon.png"
                  }
                  title="Email"
                  className="support-mail"
                />
                <a href="https://m.facebook.com/groups/299170486016271/?ref=share&mibextid=NSMWBT" target="_blank">
                  Facebook
                </a>
              </div>
              <div className="social-btn">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    "/assets/images/home/transparent.gif"
                  }
                  title="Instagram"
                  className="support-ig"
                />
                <a href="https://instagram.com/poisabazz?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D" target="_blank" className="ui-link">
                  Instagram
                </a>
              </div>
            </div> */}
            { 
            data?.whatsappShowing != "false" ? 
            <div className="extend-btn">
              <img
                src="assets/images/transparent.gif"
                title="WhatsApp"
                className="support-whatsapp"
              />
              {data?.whatsappShowing == 'true' && data?.whatsappContent != '' && <a
                href={"http://Wa.me/+" + data?.whatsappContent}
                target="_blank"
              >
                WhatsApp 1
              </a>}
              {data?.whatsappShowing2 == 'true' && data?.whatsappContent2 != '' && <a
                href={"http://Wa.me/+" + data?.whatsappContent2}
                target="_blank"
                className="split-line"
              >
                WhatsApp 2
              </a>}
              {/* <a
              href="http://Wa.me/+15705055756"
              target="_blank"
              className="split-line"
            >
              +1 570 5055756
            </a> */}
            </div> : ""}
            
            {data?.telegramShowing != "false" || data?.telegramShowing2  != "false" ?
            <div className="extend-btn">
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/transparent.gif"
                }
                title="Telegram"
                className="support-telegram"
              />
              {data?.telegramShowing == 'true' && data?.telegramContent != '' && <a href={"http://t.me/" + data?.telegramContent} target="_blank">{data?.telegramContent}</a>}
              {data?.telegramShowing2 == 'true' && data?.telegramContent2 != '' && <a href={"http://t.me/" + data?.telegramContent2} target="_blank" className="split-line">
                {data?.telegramContent2}
              </a>}
            </div>
            :""}
            <div className="support-social">
              {/* <div className="social-btn">
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/transparent.gif"
                }
                title="Skype"
                className="support-skype"
              />
              <a href="#" target="_blank">
                Skype
              </a>
            </div> */}

              {data?.facebookShowing == 'true' && data?.facebookContent != '' && <div className="social-btn">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    "/assets/images/home/icons8-facebook-48.png"
                  }
                  title="Email"
                  className="support-mail"
                />
                {/* <a href={`mailto:${data?.emailContent}`} target="_blank">
                Email
              </a> */}
                <a href="https://m.facebook.com/groups/299170486016271/?ref=share&mibextid=NSMWBT" target="_blank">
                  Facebook
                </a>
              </div>}

              {data?.instagramShowing == 'true' && data?.instagramContent != '' && <div className="social-btn">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    "/assets/images/transparent.gif"
                  }
                  title="Instagram"
                  className="support-ig"
                />
                <a href={data?.instagramContent} target="_blank" className="ui-link">
                  Instagram
                </a>
              </div>}
            </div>
          </div>

          <div>
            <h4></h4>
          </div>


          <div id="powerWrap" className="betfair-wrap betfair-login ">
            <p className="">Powered by</p>
            <span></span>
          </div>

          <ul className="policy-link">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Rules and Regulations</a>
            </li>
            <li>
              <a href="#">KYC</a>
            </li>
            <li>
              <a href="#">Responsible Gaming</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Self-Exclusion Policy</a>
            </li>
            <li>
              <a href="#">Underage Policy</a>
            </li>
          </ul>

          <div className="extra-wrap">
            {/* <div
              id="powerWrap"
              className="power-wrap-b"
              style={{ display: "block" }}
            >
              <span>Powered by</span>
              <img
                src={
                  process.env.REACT_APP_URL +
                  "/assets/images/home/transparent.gif"
                }
              />
            </div> */}

            {/* <div className="appdl-link-android" style={{ display: "block" }}>
              <a href="#">
                <img
                  src={
                    process.env.REACT_APP_URL +
                    "/assets/images/home/btn-appdl-android.png"
                  }
                  alt=""
                />
              </a>
              <p>v1.11 - 2022-03-23 - 3.1MB</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
