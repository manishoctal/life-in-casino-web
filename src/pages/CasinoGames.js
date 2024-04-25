import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import { apiGet, apiPost } from "../Utils/apiFetch";
import apiPath from "../Utils/apiPath";
import { toast } from "wc-toast";
import { Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
function CasinoGames() {
    const location = useLocation();
    const [games, setGames] = useState([]);
    const [searchKey, setSearchKey] = useState(location?.state?.searchKey ? "Evolution Top Games" : "");
    const [page, setPage] = useState(1);
    const [pageSize, setpageSize] = useState(20);
    const [showLoadMore, setShowLoadMore] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [search_params, setSearchParams] = useState({
        page: 1,
        pageSize: 20,
    });

    const handlePageClick = (event) => {
        setSearchParams((prevState) => {
            return {
                ...prevState,
                page: event.selected + 1,
            };
        });
    };

    const navigate = useNavigate();
    let { user, vendor, setCasinoGameUrl, setLoader, user_coins, loader } =
        useContext(AuthProvider);
    const casinoVenders = async () => {
        try {
            setLoader(true)
            const { status, data: response } = await apiGet(
                apiPath.casinoGamesList,
                { provider: vendor, searchKey, ...search_params }
            );
            if (status === 200) {
                if (!response.error) {
                    if (response.data) {
                        setLoader(false)
                        // if (searchKey) {
                        //     setGames(response.data);
                        // } else {
                        setGames(response.data);
                        setPageCount(response.totalPages)
                        // }
                        if (response.hasNextPage) {
                            setShowLoadMore(true)
                        } else {
                            setShowLoadMore(false)
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
            setLoader(true)
            const data = {
                gameId,
                providerName,
                balance: user_coins?.totalCoins
            }
            console.log('data====>>>', data);
            const { status, data: response } = await apiPost(apiPath.casinoGameLogin, data);
            console.log('response', response.url)
            if (status === 200) {
                if (response.status == 0) {
                    if (response) {
                        setCasinoGameUrl(response.url);
                        setLoader(false)
                        navigate('/casino-game-play')
                    }
                } else {
                    setLoader(false)
                    toast.error(response.errorDescripion)
                }
            }
        } catch (error) {
            console.error('error:', error)
        }
    }

    useEffect(() => {
        // if (searchKey) {
        //     setPage(1)
        //     setpageSize(20)
        // }
        casinoVenders();
    }, [search_params, searchKey]);
    return (
        <div>
            {!location?.state?.vendor && <div>
                <p className="casinoGameProvider">{location?.state?.vendor ? location?.state?.vendor : vendor}'s Games</p>
                <input style={{ margin: "6px" }} placeholder="Search Games Here" onChange={(e) => setSearchKey(e.target.value)} />
            </div>}

            <div id="page">
                <div className="mian-wrap">
                    <div className="gamehall">
                        {games.length > 0
                            ? games.map((item, index) => {
                                return (
                                    <a
                                        key={index}
                                        className="entrance-half"
                                        href="javascript:void(0)"
                                        onClick={() => {
                                            if (!isEmpty(user)) {
                                                casinoGameURL(item?.game_id, item?.provider_name)
                                            } else {
                                                navigate("/login");
                                            }
                                        }}
                                        neua="Blackjack Banner"
                                    >
                                        <dl className="entrance-title">
                                            <dt>{item.game_name}</dt>
                                            <dd>Play Now</dd>
                                        </dl>
                                        <img
                                            style={{ height: "100%" }}
                                            src={item?.url_thumb}
                                            alt=""
                                        />
                                    </a>
                                );
                            })
                            : "No games found"}
                    </div>
                    {/* {showLoadMore && <div style={{ display: "flex" }}>
                        <Button type="submit" className="loadmore-btn" onClick={() => setPage(page + 1)}>
                            {loader ? "Loading..." : "Load more..."}
                        </Button>
                    </div>} */}
                    <div className="bottom-pagination">
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
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CasinoGames;
