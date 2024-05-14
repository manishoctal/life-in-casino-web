import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "wc-toast";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";
function CasinoGames() {
  const location = useLocation();
  const [vendors, setVendors] = useState();
  const [vendor, setVendor] = useState();
  const [games, setGames] = useState([]);
  const [searchKey, setSearchKey] = useState(location?.state?.searchKey ? "Evolution Top Games" : "");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(21);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [search_params, setSearchParams] = useState({
    page: 1,
    pageSize: 21,
  });

  var settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    navigator:false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll:5
  };

  const handlePageClick = (event) => {
    
    setSearchParams((prevState) => {
      return {
        ...prevState,
        page: event.selected + 1,
      };
    });
  };

  const navigate = useNavigate();
  let { user, setCasinoGameUrl, setLoader, user_coins, loader } = useContext(AuthProvider);

  const casinoVenders = async () => {
    try {
      setLoader(true);
      const { status, data: response } = await apiGet(apiPath.casinoVendors);
      if (status === 200) {
        if (!response.error) {
          if (response.data) {
            let data = [];
            if (response.data.length > 0) {
              data = response.data.map((item) => {
                if (item.providerName != "") {
                  return {
                    name: item.providerName,
                    image: `/assets/images/home/${item.providerName.toLowerCase()}.jpeg`,
                  };
                } else {
                  return {
                    name: item.providerName,
                    image: "/assets/images/home/vendor.png",
                  };
                }
              });
            }
            if (data.length > 0) setVendor(data[0].name);
            setVendors(data);
            setLoader(false);
          }
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const casinoGamesList = async (vendor) => {
    console.log("vendor: ", vendor);
    try {
      setLoader(true);
      const { status, data: response } = await apiGet(apiPath.casinoGamesList, { provider: vendor, searchKey, pageSize });
      if (status === 200) {
        if (!response.error) {
          if (response.data) {
            setLoader(false);
            // if (searchKey) {
            //     setGames(response.data);
            // } else {
            setGames(response.data);
            setPageCount(response.totalPages);
            // }
            if (response.hasNextPage) {
              setShowLoadMore(true);
            } else {
              setShowLoadMore(false);
            }
          }
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const casinoGameURL = async (gameId, providerName) => {
    try {
      setLoader(true);
      const data = {
        gameId,
        providerName,
        balance: user_coins?.totalCoins,
      };
      console.log("data====>>>", data);
      const { status, data: response } = await apiPost(apiPath.casinoGameLogin, data);
      console.log("response", response.url);
      if (status === 200) {
        if (response.status == 0) {
          if (response) {
            setCasinoGameUrl(response.url);
            setLoader(false);
            navigate("/casino-game-play");
          }
        } else {
          setLoader(false);
          toast.error(response.errorDescripion);
        }
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  useEffect(() => {
    
    casinoGamesList(vendor);
  }, [vendor, searchKey, search_params, pageSize]);
  useEffect(() => {
    casinoVenders();
  }, []);
  return (
    <div>
      <Slider {...settings} className="GameSlider">
           
      {vendors?.length > 0
        ? vendors.map((item, index) => {
            if (item != "") {
              return (
                

              
                <div className="gameCTG">
                <a
                  key={index}
                  className={item.name == vendor ? "entrance active" : "entrance"}
                  href="javascript:void(0)"
                  onClick={() => {
                    // if (!isEmpty(user)) {
                    if (item.name == "Evolution Gaming") {
                      setVendor("DC");
                      // navigate("/casino-games", { state: { searchKey: "Evolution Top Games", vendor: "Evolution Gaming" } });
                    } else {
                      setVendor(item.name);
                      // navigate("/casino-games");
                    }
                    // } else {
                    //   navigate("/login");
                    // }
                  }}
                >
                   <span><img src={item?.name == vendor ? `/assets/images/casino/${item?.name?.toUpperCase()}_gold.png` : `/assets/images/casino/${item?.name?.toUpperCase()}_gray.png`} alt=""/></span>
                  <dt>{item?.name}</dt>
                 
                </a>
                </div>
          
  

          


              );
            }
            
          })
          
        : ""}
        </Slider>
      <div id="page">
        <div className="mian-wrap">
          <div className="gamehall homepageList">
            {games.length > 0
              ? games.map((item, index) => {
                  return (
                    <a
                      key={index}
                      className="entrance-half"
                      href="javascript:void(0)"
                      onClick={() => {
                        if (!isEmpty(user)) {
                          casinoGameURL(item?.game_id, item?.provider_name);
                        } else {
                          navigate("/login");
                        }
                      }}
                      neua="Blackjack Banner"
                    >
                      {/* <dl className="entrance-title">
                        <dt>{item.game_name}</dt>
                        <dd>Play Now</dd> 
                      </dl> */}
                      <img style={{ height: "100%" }} src={item?.url_thumb} alt="" />
                    </a>
                  );
                })
              : "No games found"}
          </div>
          {showLoadMore && <div style={{ display: "flex" }}>
                        <Button type="submit" className="loadmore-btn" onClick={() => setPageSize(pageSize + 20)}>
                            {loader ? "Loading..." : "Load more..."}
                        </Button>
                    </div>}
          {/* <div className="bottom-pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel=" >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< "
              renderOnZeroPageCount={null}
              activeClassName="p-0"
              activeLinkClassName="pagintion-li"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CasinoGames;
