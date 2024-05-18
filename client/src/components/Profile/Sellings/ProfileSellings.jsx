import {Link, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../../UserContext";
import Footer from "../../Helpers/Footer";
import ProductList from "../../Product/ProductList";

export default function ProfileSellings() {
    const [products, setProducts] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const {user, getUser} = useContext(UserContext);
    const [queryParams] = useSearchParams();
    const [baseLink, setBaseLink] = useState("http://localhost:3000/profile/sellings");

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            let page = queryParams.get("page") ? queryParams.get("page") : 1;
            axios.get(`/products/?user_id=${user.data.id}&page=${page}`)
                .then(res => {
                    setProducts(res.data.data);
                    setPagesCount(res.data.pages_count);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [user]);

    return (
        <div>
            <div className="flex items-center justify-center">
                <Link to={'/profile/sellings/new'} className="flex bg-gray-400 rounded-2xl px-4 py-2">
                    Добавить товар
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </Link>
            </div>

            <ProductList products={products} pagesCount={pagesCount} baseLink={baseLink} linkToDisplayPage={'/profile/sellings/'} ableToDelete={true}/>

            <Footer/>
        </div>
    );
}