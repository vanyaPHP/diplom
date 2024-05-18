import Navbar from "../components/Helpers/Navbar";
import Footer from "../components/Helpers/Footer";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');

    function registerUser(event) {
        event.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email,
            password: password
        };

        axios.post('/auth/register', data)
            .then((response) => {
                if (response.status == 201) {
                    setRedirect('/login');
                }
            })
            .catch((err) => {
                alert('Wrong credentials');
            });
    }

    if (redirect !== '') {
        return <Navigate to={redirect} />
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>

            <div className="bg-slate-800 p-8 rounded-xl w-2/5 mx-auto mt-24 mb-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Регистрация</h2>
                    <h3 className="text-gray-400 text-sm">Заполните поля ниже</h3>
                </div>
                <form onSubmit={registerUser}>
                    <div className="mt-3">
                        <label htmlFor="first_name"
                               className="block text-white text-sm font-semibold mb-2">Имя</label>
                        <input type="text" id="first_name" name="first_name"
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               value={firstName}
                               onChange={(e) => setFirstName(e.currentTarget.value)}
                               required/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="last_name"
                               className="block text-white text-sm font-semibold mb-2">Фамилия</label>
                        <input type="text" id="last_name" name="last_name"
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               value={lastName}
                               onChange={(e) => setLastName(e.currentTarget.value)}
                               required/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="phone"
                               className="block text-white text-sm font-semibold mb-2">Мобильный телефон</label>
                        <input type="tel" id="phone" name="phone_number"
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                               required/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="email"
                               className="block text-white text-sm font-semibold mb-2">E-mail</label>
                        <input type="email" id="email" name="email"
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               value={email}
                               onChange={(e) => setEmail(e.currentTarget.value)}
                               required/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="password"
                               className="block text-white text-sm font-semibold mb-2">Пароль</label>
                        <input type="password" id="password" name="password"
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               value={password}
                               onChange={(e) => setPassword(e.currentTarget.value)}
                               required/>
                    </div>

                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-600 mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                        Зарегестрироваться
                    </button>

                    <div className="flex gap-1 mt-2 text-sm text-gray-400">
                        <h2 >Уже есть аккаунт?</h2>
                        <Link to={'/login'} className="underline">Войти</Link>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}