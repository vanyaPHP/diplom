import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProfileSellingBetCard from "./ProfileSellingBetCard";
import Footer from "../../Helpers/Footer";
import Paginator from "../../Helpers/Paginator";

export default function ProfileSellingBets() {
    const params = useParams();
    const [baseLink, setBaseLink] = useState("");
    const [pagesCount, setPagesCount] = useState(0);
    const [queryParams] = useSearchParams();
    const [bets, setBets] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState('');   

    useEffect(() => {
        let product_id = params.action;
        let page = (queryParams.get('page') != null) ? queryParams.get('page') : 1;
        setBaseLink(`http://localhost:3000/profile/selling/${product_id}/bet`);
        if (product_id) {
            axios.get(`/bets/list-product-bets/${product_id}?page=${page}`)
                .then(res => {
                    setPagesCount(res.data.pagesCount);
                    setBets(res.data.betsData.bets);
                });
        }
    }, [params]);

    function acceptFilters() {
        let product_id = params.action;
        let page = (queryParams.get('page') != null) ? queryParams.get('page') : 1;
        let query = `?page=${page}`;
        if (fromDate) {
            query += `&fromDate=${fromDate}`;
        }
        if (toDate) {
            query += `&toDate=${toDate}`;
        }
        if (price != '') {
            query += `&price=${price}`;
        }
        if (rating != '') {
            query += `&rating=${rating}`;
        }
        if (status != '') {
            query += `&status=${status}`;
        }
        axios.get(`/bets/list-product-bets/${product_id}${query}`)
            .then(res => {
                setPagesCount(res.data.pagesCount);
                if (Object.keys(res.data.betsData).length > 0) {
                    setBets(res.data.betsData.bets);
                } else {
                    setBets([]);
                }
            });
    }

    return (
            <div>
                <div className="flex flex-col justify-center items-center font-medium">
                    <div className="flex flex-wrap items-center mb-4 rounded-lg p-4 bg-slate-800 text-white">
                        <label htmlFor="fromDate" className="mr-2">
                            Дата ставки от:
                        </label>
                        <input type="date" id="fromDate" placeholder="From Date"
                            className="border text-black rounded-lg p-2 mr-2 hover:cursor-pointer"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.currentTarget.value)}
                        />
                        <label htmlFor="toDate" className="mr-2 ml-4">
                            Дата ставки до:
                        </label>
                        <input type="date" id="toDate" placeholder="To Date"
                            className="border text-black rounded-lg p-2 mr-2 hover:cursor-pointer"
                            value={toDate}
                            onChange={(e) => setToDate(e.currentTarget.value)}
                        />
                        <label htmlFor="price" className="mr-2 ml-4">
                            Сумма ставки:
                        </label>
                        <select id="price"
                            className="border text-black rounded-lg p-2 mr-2 hover:cursor-pointer"
                            value={price}
                            onChange={(e) => setPrice(e.currentTarget.value)}
                        >
                            <option value="no">Не установлено</option>
                            <option value="desc">Сначала высокая</option>
                            <option value="asc">Сначала низкая</option>
                        </select>
                        <label htmlFor="rating" className="mr-2 ml-4">
                            Рейтинг покупателей:
                        </label>
                        <select id="rating"
                            className="border text-black rounded-lg p-2 mr-2 hover:cursor-pointer"
                            value={rating}
                            onChange={(e) => setRating(e.currentTarget.value)}
                        >
                            <option value="no">Не установлено</option>
                            <option value="desc">Сначала высокий</option>
                            <option value="asc">Сначала низкий</option>
                        </select>
                        <label htmlFor="status" className="mr-2 ml-4">
                            Статус:
                        </label>
                        <select id="status"
                            className="border text-black rounded-lg p-2 mr-2 hover:cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.currentTarget.value)}
                        >
                            <option value="ALL">Все</option>
                            <option value="MADE">Сделана</option>
                            <option value="ACCEPTED">Принята</option>
                            <option value="REJECTED">Отклонена</option>
                        </select>
                        <button 
                            className="border border-slate-800 text-black rounded-xl bg-gray-400 p-2 ml-2 mr-2 hover:cursor-pointer hover:text-white hover:rounded-2xl"    
                            onClick={() => acceptFilters()}
                        >
                            Применить фильтр
                        </button>
                    </div>
                </div>

                {bets.length 
                    ?
                    <>
                        <div className="flex justify-center items-center mt-2 mb-4">
                            <Paginator pagesCount={pagesCount} baseLink={baseLink}/>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                            {bets.map((bet) => (
                                <ProfileSellingBetCard bet={bet}/>
                        ))}
                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <Paginator pagesCount={pagesCount} baseLink={baseLink}/>
                        </div>
                    </> 
                    :
                    <>
                    </>
                }
                
                {bets.length 
                    ?
                    <div className="mt-24">
                        <Footer />
                    </div>
                    :
                    <div>
                        <h2 className="text-center text-2xl mt-24">Ставки не найдены</h2>
                        <br/>
                        <br/>
                        <div className="mt-48">
                            <Footer />
                        </div>    
                    </div>
                }
            </div>
        );
}