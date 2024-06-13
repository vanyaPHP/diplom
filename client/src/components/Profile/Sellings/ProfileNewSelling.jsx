import {useContext, useEffect, useState} from "react";
import Footer from "../../Helpers/Footer";
import axios from "axios";
import PhotosUploader from "../../Helpers/PhotoUploader";
import {UserContext} from "../../../UserContext";
import {Navigate} from "react-router-dom";

export default function ProfileNewSelling() {
    const [name, setName] = useState('');
    const {user, getUser} = useContext(UserContext);
    const [description, setDescription] = useState('');
    const [startPrice, setStartPrice] = useState(20);
    const [categoryId, setCategoryId] = useState(0);
    const [cityId, setCityId] = useState(0);
    const [creditCardId, setCreditCardId] = useState(0);
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState(3);
    const [immediateBuy, setImmediateBuy] = useState(40);
    const [photos, setPhotos] = useState([]);
    const [cities, setCities] = useState([]);
    const [creditCards, setCreditCards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            axios.get(`/products/product-form-info?user_id=${user.data.id}`)
            .then(res => {
                console.log(res.data);
                setCategories(res.data.categories);
                setCreditCards(res.data.credit_cards);
                setCities(res.data.cities);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [user]);

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

    function saveProduct(event) {
        event.preventDefault();

        const data = {
            product_name: name, product_description: description, product_start_price: startPrice,
            immediate_buy_price: immediateBuy, category_id: categoryId, owner_id: user.data.id,
            cityId: cityId, seller_credit_card_id: creditCardId, street: street,
            building: building, is_sold: false, product_reviews: 0, photos: photos
        };

        axios.post('/products/save-product', data)
            .then(res => {
                setRedirect('/profile/sellings');
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (redirect !== '') {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <form className="ml-8 mb-8" onSubmit={saveProduct}>
                <h2 className="text-2xl mt-4 text-center">Общая информация</h2>
                {preInput('Название', 'Наименование вашего продукта')}
                <input type="text"
                       className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={name}
                       onChange={ev => setName(ev.target.value)}
                       placeholder="Название, например: Стол деревянный"/>

                {preInput('Описание', 'Детальное описание вашего товара')}
                <textarea type="text"
                       className="w-4/5 h-140 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={description}
                       onChange={ev => setDescription(ev.target.value)}
                       placeholder="Описание"/>

                {preInput('Категория', 'Название категории')}
                <select
                    className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                    onChange={ev => setCategoryId(ev.target.value)}
                >
                    <option value={0} key={0}>Выберите категорию вашего товара</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category.id} value={category.id}>{category.category_name}</option>
                    ))}
                </select>

                {preInput('Цена', 'Стартовая цена для продажи')}
                <input type="text"
                       className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={startPrice}
                       onChange={ev => setStartPrice(ev.target.value)}
                       placeholder="Установите стартовую цену"/> <span>BYN</span>

                {preInput('Цена мгновенной покупки', 'Цена для покупки без торгов')}
                <input type="text"
                       className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={immediateBuy}
                       onChange={ev => setImmediateBuy(ev.target.value)}
                       placeholder="Установите цену мгновенной покупки"/> <span>BYN</span>

                {preInput('Кредитная карта для перевода средств', 'Номер кредитной карты из сохраненных')}
                <select
                     className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                     onChange={ev => setCreditCardId(ev.target.value)}
                >
                    <option value={0} key={0}>Выберите кредитную карту</option>
                    {creditCards && creditCards.length && creditCards.map(creditCard => (
                        <option key={creditCard.id} value={creditCard.id}>
                            {creditCard.card_number}  (
                                {creditCard.card_expiration_date[0]}{creditCard.card_expiration_date[1]}
                                /
                                {creditCard.card_expiration_date[2]}{creditCard.card_expiration_date[3]}
                            ) 
                        </option>
                    ))}
                </select>                       

                {preInput('Фото', 'Фото вашего товара')}
                <PhotosUploader addedPhotos={photos} onChange={setPhotos}/>


                <hr className="w-full h-1 mx-auto my-4 bg-slate-800 border-0 rounded md:my-10"/>

                <h2 className="text-2xl mt-4 text-center">Информация о местонахождении</h2>

                {preInput('Город', 'Название города')}
                <select
                    className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                    onChange={ev => setCityId(ev.target.value)}
                >
                    <option value={0} key={0}>Выберите ваш город</option>
                    {cities.length > 0 && cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>

                {preInput('Улица', 'Название улицы')}
                <input type="text"
                       className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={street}
                       onChange={ev => setStreet(ev.target.value)}
                       placeholder="Введите название вашей улицы"/>

                {preInput('Здание', 'Номер дома')}
                <input type="text"
                       className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={building}
                       onChange={ev => setBuilding(ev.target.value)}
                       placeholder="Введите номер дома"/>



                <br/>
                <button className="primary my-4 bg-slate-800 text-white border rounded-2xl px-4 py-2">
                    Сохранить
                </button>
            </form>

            <Footer />
        </div>
    );
}