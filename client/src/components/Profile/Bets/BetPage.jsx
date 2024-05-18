import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../../UserContext";
import Paginator from "../../Helpers/Paginator";
import { useSearchParams } from "react-router-dom";
import BetGroup from "./BetGroup";
import Footer from "../../Helpers/Footer";

export default function BetPage() {
    const { user, getUser } = useContext(UserContext);
    const [queryParams] = useSearchParams();
    const [pagesCount, setPagesCount] = useState(1);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [availableProducts, setAvailableProducts] = useState([]);
    const [product_id, setProductId] = useState(''); 
    const [baseLink, setBaseLink] = useState('htpp://localhost:3000/profile/buyings');
    const [bets, setBets] = useState(null);

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            let page = (queryParams.get('page') != null) ? queryParams.get('page') : 1;
            let query = `?user_id=${user.data.id}&page=${page}`;
            axios.get(`/bets/user-products-bets${query}`)
                .then(res => {
                    setAvailableProducts(res.data.availableProducts);
                    setPagesCount(res.data.pagesCount);
                    setBets(res.data.betsData);
                });
        }
    }, [user]);

    function acceptFilters() {
        let page = (queryParams.get('page') != null) ? queryParams.get('page') : 1;
        let query = `?page=${page}&user_id=${user.data.id}`;
        if (fromDate) {
            query += `&fromDate=${fromDate}`;
        }
        if (toDate) {
            query += `&toDate=${toDate}`;
        }
        if (price != '') {
            query += `&price=${price}`;
        }
        if (product_id != 'no') {
            query += `&product_id=${product_id}`;
        }
        if (status != '') {
            query += `&status=${status}`;
        }
        axios.get(`/bets/user-products-bets${query}`)
            .then(res => {
                setPagesCount(res.data.pagesCount);
                setBets(res.data.betsData);
            });
    }

    if (bets) {
        return (
            <div>
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
                            <label htmlFor="product_id" className="mr-2 ml-4">
                                Товар:
                            </label>
                            <select id="product_id"
                                className="border text-black rounded-lg p-2 mr-2 hover:cursor-pointer"
                                value={product_id}
                                onChange={(e) => setProductId(e.currentTarget.value)}
                            >
                                <option value="no">Не установлено</option>
                                {availableProducts.length && availableProducts.map((availableProduct) => (
                                    <option value={availableProduct.product_id}>{availableProduct.product_name}</option>
                                ))}
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
                </div>
                {Object.keys(bets).length
                    ?
                    <>
                        <div className="flex justify-center items-center mt-2">
                            <Paginator pagesCount={pagesCount} baseLink={baseLink}/>
                        </div>
                        <div className="container mx-auto py-8">
                            {Object.keys(bets).map((productId) => (
                                <BetGroup betGroup={bets[productId]}/>
                            ))}
                        </div>
                        <div className="flex justify-center items-center mb-24 -mt-16">
                            <Paginator pagesCount={pagesCount} baseLink={baseLink}/>
                        </div>
    
                        <Footer/>
                    </>
                    :
                    <h1 className="h-screen text-center text-4xl mt-32 -mb-64">Вы не делали ставки на товары</h1>
                }
            </div>
        );
    }
}