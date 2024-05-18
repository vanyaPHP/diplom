import {Link, Navigate, useParams} from "react-router-dom";
import PhotosUploader from "../../Helpers/PhotoUploader";
import Footer from "../../Helpers/Footer";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../UserContext";
import axios from "axios";

export default function ProfileSellingEdit() {
    const {action} = useParams();
    const [name, setName] = useState('');
    const [product, setProduct] = useState(null);
    const {user} = useContext(UserContext);
    const [description, setDescription] = useState('');
    const [startPrice, setStartPrice] = useState(20);
    const [categoryId, setCategoryId] = useState(0);
    const [cityId, setCityId] = useState(0);
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState(3);
    const [immediateBuy, setImmediateBuy] = useState(40);
    const [photos, setPhotos] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [redirect, setRedirect] = useState('');


    useEffect(() => {
        axios.get('/products/' + action)
            .then(res => {
                setCategories(res.data.categories);
                setCities(res.data.cities);
                let productData = res.data.product;
                setProduct(productData);
                setName(productData.name);
                setDescription(productData.description);
                setStartPrice(productData.start_price);
                setCategoryId(productData.category.id);
                setImmediateBuy(productData.immediate_buy_price);
                let photos = productData.photos;
                let main_image_url = productData.main_image_url;
                if (photos.length > 0) {
                    if (main_image_url !== "") {
                        let temp = photos[0];
                        let main_image_url_index = photos.indexOf(main_image_url);
                        photos[0] = main_image_url;
                        photos[main_image_url_index] = temp;
                    }
                }
                setPhotos(photos);
                setCityId(productData.address_details.city.id);
                setCategoryId(productData.category.id);
                setStreet(productData.address_details.street);
                setBuilding(productData.address_details.building);
                document.getElementById('city-picker').value = productData.address_details.city.id;
                document.getElementById('category-picker').value = productData.category.id;
            })
            .catch(err => {
                console.log(err);
            })
    }, [action]);

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

    function deleteProduct(event) {
        event.preventDefault();

        axios.delete(`/products/delete-product/${action}`)
            .then(res => {
                setRedirect('/profile/sellings');
            })
    }

    function updateProduct(event) {
        event.preventDefault();

        const data = {
            product_name: name, product_description: description, address_details_id: product.address_details.id,
            cityId: cityId, street: street, building: building,
            immediate_buy_price: immediateBuy, photos: photos, product_id: action
        };

        axios.put('/products/update-product', data)
            .then(res => {
                setRedirect('/profile/sellings');
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (redirect !== '')
    {
        return <Navigate to={redirect} />
    }


    return (
        <div>
            <form className="ml-8 mb-8" onSubmit={updateProduct}>
                <button onClick={deleteProduct} className="flex bg-gray-400 mx-auto rounded-2xl px-4 py-2">
                    Удалить товар
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </button>

                <h2 className="text-2xl mt-8 text-center">Общая информация</h2>

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
                <select id="category-picker"
                        className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl" disabled={true}
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
                       disabled={true}
                       onChange={ev => setStartPrice(ev.target.value)}
                       placeholder="Установите стартовую цену"/> <span>BYN</span>

                {preInput('Цена мгновенной покупки', 'Цена для покупки без торгов')}
                <input type="text"
                       className="w-4/5 border border-gray-600 my-1 py-2 px-3 rounded-2xl"
                       value={immediateBuy}
                       onChange={ev => setImmediateBuy(ev.target.value)}
                       placeholder="Установите цену мгновенной покупки"/> <span>BYN</span>

                {preInput('Фото', 'Фото вашего товара')}
                <PhotosUploader addedPhotos={photos} onChange={setPhotos} productId={action}/>


                <hr className="w-full h-1 mx-auto my-4 bg-slate-800 border-0 rounded md:my-10"/>

                <h2 className="text-2xl mt-4 text-center">Информация о местонахождении</h2>

                {preInput('Город', 'Название города')}
                <select id="city-picker"
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
                    Обновить
                </button>
            </form>

            <Footer/>
        </div>
    );
}