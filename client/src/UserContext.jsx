import {createContext, useCallback, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let getUser = () => {
        let name = "user_id=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        let id = 0;
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                id =  c.substring(name.length, c.length);
            }
        }

        name = "is_admin=";
        decodedCookie = decodeURIComponent(document.cookie);
        ca = decodedCookie.split(';');
        let isAdmin = 0;
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                isAdmin =  c.substring(name.length, c.length);
            }
        }

        if (id.length > 0) {
            axios.get(`/user/profile/${id}?is_admin=${isAdmin}`).then((response) => {
                setUser(response.data);
                setIsLoading(false);
            })
        } else {

        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{user, isLoading, setUser, getUser}} >
            {children}
        </UserContext.Provider>
    );
}