import {useContext, useState} from "react";
import Footer from "../../Helpers/Footer";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {UserContext} from "../../../UserContext";

export default function CreditCardsNew() {
    const {user} = useContext(UserContext);
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpirationMonth, setCardExpirationMonth] = useState('');
    const [cardExpirationYear, setCardExpirationYear] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [redirect, setRedirect] = useState('');

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header,description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    function saveCard(event) {
        event.preventDefault();

        const data = {
            card_number: cardNumber, card_expiration_date: cardExpirationMonth + cardExpirationYear,
            card_holder: cardHolder, card_cvv: cardCvv, owner_id: user.data.id 
        };

        axios.post('/user/credit-cards', data)
        .then((response) => {
            if (response.status == 201) {
                setRedirect('/profile/credit-cards');
            }
        })
        .catch((err) => {
            alert('Wrong credentials');
        });
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <h2 className="text-2xl mt-4 text-center">Информация о карте</h2>
            <form className="ml-12 mb-8" onSubmit={saveCard}>
                {preInput('Номер', 'Номер вашей карты')}
                <input type="text"
                       className="w-1/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={cardNumber}
                       onChange={ev => setCardNumber(ev.target.value)}
                       placeholder="Номер карты, например: 4242424242424242"/>

                
                {preInput('Дата истечения срока', 'Месяц и год истечения срока карты')}
                <input type="text"
                       className="w-16 mr-2 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={cardExpirationMonth}
                       onChange={ev => setCardExpirationMonth(ev.target.value)}
                       placeholder="02"/>
                /
                <input type="text"
                       className="w-16 ml-2 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={cardExpirationYear}
                       onChange={ev => setCardExpirationYear(ev.target.value)}
                       placeholder="24"/>

                {preInput('Держатель карты', 'Имя и фамилия держателя карты')}
                <input type="text"
                       className="w-1/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={cardHolder}
                       onChange={ev => setCardHolder(ev.target.value)}
                       placeholder="Держатель карты, например: IVAN IVANOV"/>


                {preInput('CVV код', 'CVV код карты')}
                <input type="text"
                       className="w-1/5 mr-2 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={cardCvv}
                       onChange={ev => setCardCvv(ev.target.value)}
                       placeholder="CVV код карты, например: 123"/>

                <br/>
                <button className="primary my-4 bg-slate-800 text-white border rounded-2xl px-4 py-2">
                    Сохранить
                </button>
            </form>

            <Footer />
        </div>
    );
}