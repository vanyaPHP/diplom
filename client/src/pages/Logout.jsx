import {useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";
import {Navigate} from "react-router-dom";

export default function Logout() {
    const {setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        setUser(null);
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setRedirect('/');
    }, []);

    if (redirect) {
        return <Navigate to="/" />
    }
}