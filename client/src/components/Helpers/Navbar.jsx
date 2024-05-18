import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../UserContext";

export default function Navbar({selected_category_id = null}) {
    const {user} = useContext(UserContext);
    const params = useParams();
    const [chosenCategory, setChosenCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        setChosenCategory(params.category_id);
        axios.get('/main-page/')
            .then(res => {
                setCategories(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    return (
        <div>
            <div className="bg-slate-800 flex items-center text-white h-16">
                <Link to={'/'} className="text-2xl hover:bg-gray-700 flex gap-2 items-center font-bold px-4">
                    Belbay
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                    </svg>
                </Link>

                <div className="relative ml-3 flex gap-2 items-center w-[2/3]">
                    {categories.map((category) => {
                        if (category.id == chosenCategory) {
                            return (
                                <div
                                    className="bg-slate-300 px-2 border-gray-200 flex items-center rounded-md h-8 text-gray-700">
                                    <a className=""
                                       href={`/categories/${category.id}`}>{category.category_name}</a>
                                </div>
                            )
                        } else {
                            return (
                                <div
                                    className="hover:bg-slate-300 px-2 border-gray-200 flex items-center rounded-md h-8 hover:text-gray-900">
                                    <a className=""
                                       href={`/categories/${category.id}`}>{category.category_name}</a>
                                </div>
                            )
                        }
                    })}
                </div>

                <div className="relative ml-6 flex">
                    <input type="text" placeholder="Поиск по товарам"
                           className="border-2 border-gray-500 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"/>
                    <button className="relative right-0 top-0 mt-1 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                        </svg>
                    </button>
                </div>

                {user && (
                    <div className="flex gap-2 ml-24">
                        {!user.is_admin && (
                            <Link to={'/profile'} className="px-1 hover:bg-slate-300 border-gray-200 flex items-center h-8 mr-4 rounded-md hover:text-gray-900">
                                Профиль
                            </Link>
                        )}
                        <Link to={'/chats'} className="px-1 hover:bg-slate-300 border-gray-200 flex items-center h-8 mr-4 rounded-md hover:text-gray-9000">
                            Чаты
                        </Link>
                        <Link to={'/logout'} className="hover:bg-slate-300 border-gray-200 flex items-center h-8 rounded-md hover:text-gray-900">
                            Выйти
                        </Link>
                    </div>
                )}
                {!user && (
                    <div className="flex gap-2 ml-36">
                        <Link to={'/login'} className="px-4 mr-4 hover:bg-slate-300 border-gray-200 flex items-center h-8 rounded-md hover:text-gray-900">
                            Вход
                        </Link>
                        <Link to={'/register'} className="hover:bg-slate-300 border-gray-200 flex items-center h-8 rounded-md hover:text-gray-900">
                            Регистрация
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}