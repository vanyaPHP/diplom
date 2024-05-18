import Footer from "../../Helpers/Footer";
import {useContext} from "react";
import {UserContext} from "../../../UserContext";

export default function ProfileBody() {
    const {user, getUser} = useContext(UserContext);

    if (!user) {
        getUser();
    }

    if (user && user.data) {
        return (
            <div>
                <div className="bg-slate-800 p-8 rounded-xl w-2/5 mx-auto mt-16 mb-24">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Информация о вашем профиле</h2>
                        <h3 className="text-gray-400 text-sm">
                            Информация о ваших контактных данных является конфиденциальной и не подлежит распространению
                        </h3>
                    </div>
                    <form>
                        <div className="mt-3">
                            <label htmlFor="first_name"
                                   className="block text-white  text-sm font-semibold mb-2">Имя</label>
                            <input type="text"
                                   id="first_name"
                                   disabled={true}
                                   name="first_name"
                                   value={user.data.first_name}
                                   className="w-full disabled bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                   required/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="second_name"
                                   className="block text-white  text-sm font-semibold mb-2">Фамилия</label>
                            <input type="text"
                                   id="second_name"
                                   disabled={true}
                                   name="second_name"
                                   value={user.data.second_name}
                                   className="w-full disabled bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                   required/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="email"
                                   className="block text-white  text-sm font-semibold mb-2">E-mail</label>
                            <input type="email"
                                   id="email"
                                   disabled={true}
                                   name="email"
                                   value={user.data.email}
                                   className="w-full disabled bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                   required/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="phone_number"
                                   className="block text-white  text-sm font-semibold mb-2">Номер телефона</label>
                            <input type="text"
                                   id="phone_number"
                                   disabled={true}
                                   name="phone_number"
                                   value={user.data.phone_number}
                                   className="w-full disabled bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                   required/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="seller_rating"
                                   className="block text-white  text-sm font-semibold mb-2">Рейтинг продавца</label>
                            <input type="text"
                                   id="seller_rating"
                                   disabled={true}
                                   name="seller_rating"
                                   value={user.data.seller_rating.rating}
                                   className="w-full disabled bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                   required/>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="buyer_rating"
                                   className="block text-white  text-sm font-semibold mb-2">Рейтинг покупателя</label>
                            <input type="text"
                                   id="buyer_rating"
                                   disabled={true}
                                   name="buyer_rating"
                                   value={user.data.buyer_rating.rating}
                                   className="w-full disabled bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                   required/>
                        </div>
                    </form>
                </div>
                <Footer/>
            </div>
        );
    }
}