import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../UserContext";
import { useParams } from "react-router-dom";

export default function DealDetails() {
    const {user, getUser} = useContext(UserContext);
    const [deal, setDeal] = useState(null);
    const [cards, setCards] = useState([]);
    const [creditCard, setCreditCard] = useState(null);
    const [productReceivedConfirmCode, setProductReceivedConfirmCode] = useState('');
    const [productReturnedConfirmCode, setProductReturnedConfirmCode] = useState('');

    const params = useParams();

    useEffect(() => {
        if (!user) {
            getUser();  
        } else {
            axios.get(`/deals/show-deal/${params.name}`)
            .then(res => {
                setDeal(res.data);
                axios.get(`/user/credit-cards?user_id=${user.data.id}`)
                .then(res => {
                    setCards(res.data.credit_cards);
                })
            })
        }
    }, [user, params]);

    const pay = () => {
        axios.post('/deals/pay', {
            deal_id: deal.deal_id,
            credit_card_id: creditCard
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        })
    };

    const approveProductReceivedConfirmCode = () => {
        axios.post('/deals/approve-confirm-code', {
            deal_id: deal.deal_id,
            product_received_confirm_code: productReceivedConfirmCode
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            alert("Неверный код");
        })
    };

    const approveProductReturnedConfirmCode = () => {
        axios.post('/deals/approve-return-confirm-code', {
            deal_id: deal.deal_id,
            payback_confirm_code: productReturnedConfirmCode
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            alert("Неверный код");
        })
    };

    const setHasErrorsOnSale = () => {
        axios.post('/deals/confirm-errors-on-pass', {
            deal_id: deal.deal_id,
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            alert(err);
        })
    };

    const setHasErrorsOnReturn = () => {
        axios.post('/deals/confirm-errors-on-return', {
            deal_id: deal.deal_id,
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            alert(err);
        })
    };


    if (deal) {
        return (
            <div className="min-h-screen bg-cyan-50 flex flex-col items-center p-6">
              <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded overflow-hidden shadow-lg my-4 bg-white p-8">
                <h2 className="text-3xl font-bold mb-4">{deal.name}</h2>
                <p className="text-gray-700 text-base mb-4"><strong>Продавец:</strong> {deal.bet.product.owner.first_name} {deal.bet.product.owner.second_name}</p>
                <p className="text-gray-700 text-base mb-4"><strong>Покупатель:</strong> {deal.bet.user.first_name} {deal.bet.user.second_name}</p>
                <p className="text-gray-700 text-base mb-4"><strong>Статус сделки:</strong> <span className="text-xl">{deal.deal_status.status_description}</span> </p>
                <p className="text-gray-700 text-base mb-4"><strong>Сумма сделки:</strong> {deal.bet.price} BYN</p>
        
                {deal.bet.product.owner.id != user.data.id && (
                    <div className="mb-8 mt-8">
                        <label className="block text-gray-700 mb-2" htmlFor="credit-card">Выбор кредитной карты для оплаты</label>
                        <select
                            id="credit-card"
                            disabled={deal.pay_ok}
                            onChange={(e) => setCreditCard(e.currentTarget.value)}
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                            {cards.length && cards.map((card) => (
                                <option value={card.id}>{card.card_number}</option>
                            ))}
                        </select>

                        {!deal.pay_ok && (
                            <button 
                                className="bg-slate-800 mt-4 hover:bg-slate-900
                                 text-white font-bold
                                  hover:shadow-md
                                  rounded-xl
                                  py-2 px-4"
                                onClick={pay}  
                            >
                                Оплатить товар    
                            </button>
                        )}
                    </div>
                )}
        
                {deal.bet.product.owner.id == user.data.id
                    ?
                        <>
                           <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirm-code-1">Код подтверждения передачи покупателю(при получении покупателем)</label>
                                <input
                                    type="text"
                                    id="confirm-code-1"
                                    value={
                                        deal.check_datetime_start != null 
                                        ? deal.product_received_confirm_code
                                        : productReceivedConfirmCode
                                    }
                                    disabled={deal.check_datetime_start != null}
                                    onChange={(e) => setProductReceivedConfirmCode(e.currentTarget.value)}
                                    className="w-full px-4 py-2 border border-gray-400 rounded"
                                />

                                {deal.pay_ok && deal.check_datetime_start == null && (
                                    <button 
                                        className="bg-slate-800 mt-4 hover:bg-slate-900
                                        text-white font-bold
                                        hover:shadow-md
                                        rounded-xl
                                        py-2 px-4"
                                        onClick={approveProductReceivedConfirmCode}
                                    >
                                        Подтвердить код    
                                    </button>
                                )}
                           </div>
                           <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirm-code-2">Код подтверждения передачи продавцу(заполняется автоматически)</label>
                                <input
                                    type="text"
                                    id="confirm-code-2"
                                    value={deal.payback_confirm_code}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-400 rounded"
                                />
                           </div>

                           {deal.product_returned_datetime != null && deal.has_errors_on_return == null && (
                                <button 
                                    className="bg-slate-800 mt-4 hover:bg-slate-900
                                        text-white font-bold
                                        hover:shadow-md
                                        rounded-xl
                                        py-2 px-4"
                                    onClick={setHasErrorsOnReturn}    
                                    >
                                    Подтвердить несоответствие товара
                                </button>
                           )}
                        </>
                    :
                        <>
                             <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirm-code-1">Код подтверждения передачи покупателю(заполняется автоматически)</label>
                                <input
                                    type="text"
                                    id="confirm-code-1"
                                    value={deal.product_received_confirm_code}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-400 rounded"
                                />
                             </div>
                             <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="confirm-code-2">Код подтверждения передачи продавцу(при возврате товара)</label>
                                <input
                                    type="text"
                                    id="confirm-code-2"
                                    value={
                                        deal.product_returned_datetime != null
                                        ? deal.payback_confirm_code
                                        : productReturnedConfirmCode
                                    }
                                    disabled={deal.product_returned_datetime != null}
                                    onChange={(e) => setProductReturnedConfirmCode(e.currentTarget.value)}
                                    className="w-full px-4 py-2 border border-gray-400 rounded"
                                />
                                {deal.has_errors_on_sale && deal.product_returned_datetime == null && (
                                    <button 
                                        className="bg-slate-800 mt-4 hover:bg-slate-900
                                        text-white font-bold
                                        hover:shadow-md
                                        rounded-xl
                                        py-2 px-4"
                                        onClick={approveProductReturnedConfirmCode}
                                    >
                                        Подтвердить код    
                                    </button>
                                )}
                             </div>

                             {deal.check_datetime_start != null && !deal.has_errors_on_sale && (
                                <button 
                                    className="bg-slate-800 mt-4 hover:bg-slate-900
                                        text-white font-bold
                                        hover:shadow-md
                                        rounded-xl
                                        py-2 px-4"
                                    onClick={setHasErrorsOnSale}    
                                    >
                                    Подтвердить несоответствие товара    
                                </button>
                             )}
                        </>
                }
              </div>
            </div>
        );
    }  
}