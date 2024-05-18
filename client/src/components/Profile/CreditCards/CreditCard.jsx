import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreditCard({creditCard}) {
    const [cardExpirationMonth, setCardExpirationMonth] = useState('');
    const [cardExpirationYear, setCardExpirationYear] = useState('');
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        setCardExpirationMonth(creditCard.card_expiration_date[0] + creditCard.card_expiration_date[1]);
        setCardExpirationYear(creditCard.card_expiration_date[2] + creditCard.card_expiration_date[3]);
    }, [creditCard]);
    
    function deleteCard(card_id) {
        axios.delete(`/user/credit-cards/${card_id}`)
            .then(res => {
                setRedirect('/profile/credit-cards');
            })
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div class="p-4 max-w-sm">
            <div class="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                    </div>
                    <h2 class="text-white dark:text-white text-lg font-medium">Номер: {creditCard.card_number}</h2>
                </div>
                <div class="flex flex-col justify-between flex-grow">
                    <p class="leading-relaxed text-base text-white dark:text-gray-300">
                        Дата истечения срока: {cardExpirationMonth} / {cardExpirationYear}
                        <br />
                        Держатель карты: {creditCard.card_holder}
                        <br />
                        CVV код: {creditCard.card_cvv}
                    </p>
                    <div onClick={() => deleteCard(creditCard.id)} class="mt-3 text-black hover:cursor-pointer dark:text-white hover:text-blue-600 inline-flex items-center">Удалить
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}