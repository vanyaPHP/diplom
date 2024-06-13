import {Navigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../Helpers/Navbar";
import Footer from "../Helpers/Footer";
import { UserContext } from "../../UserContext";

export default function ProductDetails() {
    const params = useParams();
    const noPhotoLink = 'https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg';
    const [product, setProduct] = useState(null);
    const [photoLinks, setPhotoLinks] = useState([]);
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState('');
    const [currentPhoto, setCurrentPhoto] = useState("");
    const [betAmount, setBetAmount] = useState("");
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        let product_id = params.id;
        axios.get(`/products/${product_id}`)
            .then((res) => {
                let photos = res.data.product.photos;
                let main_image_url = res.data.product.main_image_url;
                if (main_image_url == "") {
                    if (!photos.length) {
                        photos.push(noPhotoLink);
                        setPhotoLinks(photos);
                    } else {
                        setPhotoLinks(photos);
                    }
                } else {
                    let temp_index = photos.indexOf(main_image_url);
                    let temp = photos[0];
                    photos[0] = main_image_url;
                    photos[temp_index] = temp;
                    setPhotoLinks(photos);
                }
                setCurrentPhoto(photos[0]);
                setProduct(res.data.product);
            })
    }, [params]);

    function prevPhoto() {
        if (photoLinks.indexOf(currentPhoto) == 0) {
            setCurrentPhoto(photoLinks[photoLinks.length - 1]);
        } else {
            setCurrentPhoto(photoLinks[photoLinks.indexOf(currentPhoto) - 1]);
        }
    }

    function nextPhoto() {
        if (photoLinks.indexOf(currentPhoto) == photoLinks.length - 1) {
            setCurrentPhoto(photoLinks[0]);
        } else {
            setCurrentPhoto(photoLinks[photoLinks.indexOf(currentPhoto) + 1]);
        }
    }
    
    function makeBet() {
        axios.post('/bets', {
            product_id: params.id,
            buyer_id: user.data.id,
            price: betAmount
        })
        .then(res => {
            setRedirect('/');
        });
    }

    function createChatWithSeller(seller_id) {
        axios.post('http://localhost:8003/api/chats', {
            first_user_id: user.data.id,
            second_user_id: seller_id
        })
        .then(res => {
            setRedirect(`/chats?chat_id=${res.data.chat_id}`);
        });
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    if (product) {
        if (showAllPhotos) {
           return (
               <div className="h-screen w-full bg-gray-900">
                   <h2 className="text-center text-white mb-12 pt-16 text-2xl">Фото товара</h2>
                   <img className="w-1/3 h-2/3 object-cover m-auto" src={currentPhoto} alt=""/>
                   <div className="flex -mt-80">
                       <button
                           onClick={prevPhoto}
                           className="flex gap-1 py-2 px-4 m-auto mt-4 rounded-2xl shadow shadow-black bg-white text-black">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="w-6 h-6">
                               <path strokeLinecap="round" strokeLinejoin="round"
                                     d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                           </svg>
                           Предыдущая
                       </button>
                       <button
                           onClick={nextPhoto}
                           className="flex gap-1 py-2 px-4 m-auto mt-4 rounded-2xl shadow shadow-black bg-white text-black">
                           Следующая
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="w-6 h-6">
                               <path strokeLinecap="round" strokeLinejoin="round"
                                     d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                           </svg>
                       </button>
                   </div>
                   <button onClick={() => setShowAllPhotos(false)}
                           className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="w-6 h-6">
                           <path fillRule="evenodd"
                                 d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                 clipRule="evenodd"/>
                       </svg>
                       Закрыть фото
                   </button>
               </div>
           );
        } else {
            return (
                <>
                    <div className="mb-16">
                        <Navbar/>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl py-8 w-2/4 mx-auto">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row -mx-4">
                                <div className="md:flex-1 px-4">
                                    <div>

                                    </div>

                                    <div className="h-[460px] rounded-lg bg-gray-50 dark:bg-gray-700 mb-4">
                                        <img className="w-full h-full object-cover"
                                             onClick={() => setShowAllPhotos(true)} src={currentPhoto} alt=""/>
                                    </div>

                                    {user && !user.data.is_admin && !(user.data.id == product.owner.id) && (
                                        <div className="flex -mx-2 mb-4">
                                            <div className="w-1/2 px-2 mx-auto">
                                                <button
                                                    onClick={() => createChatWithSeller(product.owner.id)}
                                                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    Написать продавцу
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="md:flex-1 px-4">
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        Информация о владельце: {product.owner.first_name} {product.owner.second_name}
                                        <br/>
                                        Место
                                        продажи: {product.address_details.city.name}, {product.address_details.street} {product.address_details.building}
                                        <br />
                                        Рейтинг продавца: {product.owner.seller_rating.rating}
                                    </p>
                                    <div className="flex mb-4">
                                        <div className="mr-4">
                                        <span
                                            className="font-bold text-gray-700 dark:text-gray-300">Стартовая цена: </span>
                                            <span
                                                className="text-gray-600 dark:text-gray-300">{product.start_price} BYN</span>
                                        </div>
                                        <div>
                                        <span
                                            className="font-bold text-gray-700 dark:text-gray-300">Цена выкупа: </span>
                                            <span
                                                className="text-gray-600 dark:text-gray-300">{product.immediate_buy_price} BYN</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                    <span
                                        className="font-bold text-gray-700 dark:text-gray-300">Последняя ставка:</span>
                                        <div className="flex items-center mt-2 text-gray-50">
                                            30 BYN
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Категория:</span>
                                        <div className="flex items-center mt-2">
                                            <a href={`http://localhost:3000/categories/${product.category.id}`} className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                                                {product.category.category_name}
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Описание:</span>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Ставка:</span>
                                        <div className="mt-2">
                                            <input type="text"
                                                   className="rounded-full"
                                                   value={betAmount}
                                                   onChange={(e) => setBetAmount(e.currentTarget.value)}
                                            />
                                            <span className="font-bold text-gray-700 dark:text-gray-300 ml-2">BYN</span>
                                        </div>
                                        {user && !user.data.is_admin && !(user.data.id == product.owner.id) && (
                                            <div className="w-1/2 px-2 mt-4 -ml-2">
                                                <button
                                                    onClick={makeBet}
                                                    className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    Сделать ставку
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <Footer/>
                    </div>
                </>
            );
        }
    }
}