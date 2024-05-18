import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function ProductDelete() {
    const [redirect, setRedirect] = useState('');
    const params = useParams();

    useEffect(() => {
        let product_id = params.id;
        axios.delete(`/products/delete-product/${product_id}`)
            .then(res => {
                setRedirect('/profile/sellings');
            })
    }, [params]);

    if (redirect) {
        return <Navigate to={redirect}/>
    }
}