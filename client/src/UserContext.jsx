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
        let value = 0;
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                value =  c.substring(name.length, c.length);
            }
        }

        if (value.length > 0) {
            axios.get('/user/profile/' + value).then((response) => {
                setUser(response.data);
                setIsLoading(false);
            })
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