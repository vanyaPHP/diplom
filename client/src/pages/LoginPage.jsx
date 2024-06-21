import Navbar from "../components/Helpers/Navbar";
import Footer from "../components/Helpers/Footer";
import {Link, Navigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');

    function loginUser(event) {
        event.preventDefault();
        axios.post('/auth/login', {email: email, password: password})
            .then((response) => {
                const d = new Date();
                d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                document.cookie = "user_id=" + response.data.userData.id + "; expires=" + d.toUTCString() + ";path=/";
                document.cookie = "is_admin=" + response.data.is_admin + "; expires=" + d.toUTCString() + ";path=/";
                setRedirect('/profile');
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

            <div className="bg-slate-800 p-8 rounded-xl w-2/5 mx-auto mt-32 mb-40">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Логин</h2>
                    <h3 className="text-gray-400 text-sm">Заполните поля ниже</h3>
                </div>
                <form onSubmit={loginUser}>
                    <div className="mt-3">
                        <label htmlFor="email"
                               className="block text-white text-sm font-semibold mb-2">E-mail</label>
                        <input type="email"
                               id="email"
                               name="email"
                               value={email}
                               onChange={event => setEmail(event.target.value)}
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               required/>
                    </div>

                    <div className="mt-3">
                        <label htmlFor="password"
                               className="block text-white text-sm font-semibold mb-2">Пароль</label>
                        <input type="password"
                               id="password"
                               name="password"
                               value={password}
                               onChange={event => setPassword(event.target.value)}
                               className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                               required/>
                    </div>

                    <button type="submit"
                            className="bg-blue-500 hover:bg-blue-600 mt-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                        Войти
                    </button>

                    <div className="flex gap-1 text-sm mt-2 text-gray-400">
                        <h2>Ещё не создали аккаунт?</h2>
                        <Link to={'/register'} className="underline">Зарегестрироваться</Link>
                    </div>
                </form>
            </div>

            <Footer/>
        </div>
    );
}