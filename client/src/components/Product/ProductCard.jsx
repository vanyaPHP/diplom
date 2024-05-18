import { useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function ProductCard({product, linkToDisplayPage, ableToDelete = false}) {
    const { user } = useContext(UserContext);
    let photo = '';
    if (!product.photos?.length && product.main_image_url === "") {
        photo = 'https://st.depositphotos.com/2934765/53192/v/450/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg';
    }
    else {
        photo = (product.main_image_url === "") ? product.photos[0] : product.main_image_url
    }

    return (
        <Link to={linkToDisplayPage} className="rounded-xl bg-gray-50 overflow-hidden shadow-2xl flex flex-col">
            <div className="relative">
                <img className="aspect-square w-full"
                     src={photo}
                />
                <div
                    className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                </div>
                {ableToDelete && 
                    <span>
                        <Link
                            to={`/products/delete/${product.id}`}
                            className="text-xs absolute top-0 left-0 bg-red-500 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out rounded-md">
                            Удалить
                        </Link>
                    </span>
                }
                <span>
                    <Link
                        to={`/categories/${product.category.id}`}
                        className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out rounded-md">
                        {product.category.category_name}
                    </Link>
                </span>
            </div>
            <div className="px-6 py-4 mb-auto bg-gray-50">
                <div className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                    {product.name}
                </div>
                <p className="text-gray-500 text-sm bg-gray-50">
                    {product.description}
                </p>
                <br />
                {user && (user.data.id == product.owner.id) && 
                    <Link to={`/profile/selling/${product.id}/bets`} className="text-gray-500 text-md font-bold bg-gray-50 flex gap-1 hover:underline">
                        Просмотр ставок на товар
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                }
            </div>

            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <span className="ml-1">Цена: {product.start_price} BYN</span>
                </span>


                <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      <path fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"/>
                    </svg>
                    <span className="ml-1">{product.reviews} просмотров</span>
                </span>
            </div>
        </Link>
    );
}