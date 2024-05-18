import {UserContext} from "../../../UserContext";
import { useContext, useEffect, useState } from "react";
import Footer from "../../Helpers/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import CreditCard from "./CreditCard";

export default function CreditCards() {
    const {user, getUser} = useContext(UserContext);
    const [creditCards, setCreditCards] = useState([]);

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            axios.get(`/user/credit-cards?user_id=${user.data.id}`)
            .then(res => {
                setCreditCards(res.data.credit_cards);
            })
        }
    }, [user]);

    return (
        <>
            <div className="flex items-center justify-center">
                <Link to={'/profile/credit-cards/new'} className="flex bg-gray-400 rounded-2xl px-4 py-2">
                    Добавить карту
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </Link>
            </div>

            {creditCards.length 
                ?
                <>
                    <div className="flex flex-wrap justify-center mt-10 mb-32">
                        {creditCards.map((creditCard) => <CreditCard creditCard={creditCard}/> )}
                    </div>
                    <Footer/>
                </>
                :
                <>
                    <h1 className="text-center text-2xl mt-4 mb-96">У вас нет сохранённых карт</h1>
                    <Footer/>
                </>
            }
        </>
    );
}