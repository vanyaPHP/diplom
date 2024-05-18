import Paginator from "../Helpers/Paginator";
import ProductCard from "./ProductCard";

export default function ProductList({products, pagesCount, baseLink, linkToDisplayPage, ableToDelete = false}) {
    return (
        <>
            {products.length
                ?
                <>
                    <div className="flex justify-center items-center mt-2">
                        <Paginator pagesCount={pagesCount} baseLink={baseLink}/>
                    </div>
                    <div className="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 mb-24">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
                            {products.map((product) =>
                                <ProductCard product={product} linkToDisplayPage={linkToDisplayPage + product.id}
                                    ableToDelete={ableToDelete}/>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-2 -mt-16">
                        <Paginator pagesCount={pagesCount} baseLink={baseLink}/>
                    </div>
                </>
                :
                <h1 className="h-screen text-center text-4xl mt-32 -mb-64">Товары не найдены, измените параметры поиска</h1>
            }
        </>
    );
}