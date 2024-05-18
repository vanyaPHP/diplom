import Navbar from "../components/Helpers/Navbar";
import {useParams, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Footer from "../components/Helpers/Footer";
import ProductList from "../components/Product/ProductList";
import { UserContext } from "../UserContext";

export default function IndexPage() {
    const params = useParams();
    const [queryParams] = useSearchParams();
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [baseLink, setBaseLink] = useState("http://localhost:3000");

    useEffect(() => {
        let page = (queryParams.get('page') != null) ? queryParams.get('page') : 1;
        let query = `?page=${page}`;
        if (params.category_id) {
            setBaseLink(`http://localhost:3000/categories/${params.category_id}`);
            query += `&category_id=${params.category_id}`;
        }
        axios.get(`/products/all${query}`)
            .then(res => {
                setProducts(res.data.data);
                setPagesCount(res.data.pages_count);
            })
    }, [params]);

    return (
        <div>
            <div className="bg-cyan-50">
                {params.category_id && (
                    <Navbar selected_category_id={params.category_id}/>
                )}
                {!params.category_id && (
                    <Navbar/>
                )}

                <ProductList products={products} pagesCount={pagesCount} baseLink={baseLink} linkToDisplayPage={'/product-details/'}/>

                <Footer />
            </div>
        </div>
    );
}