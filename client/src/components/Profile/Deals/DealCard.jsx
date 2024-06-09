import { Link } from "react-router-dom";

export default function DealCard({deal}) {
    return (
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 text-center rounded overflow-hidden shadow-lg m-4 bg-white transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <div className="px-8 py-6">
          <div className="font-bold text-2xl mb-2 text-gray-800">Сделка по товару {deal.bet.product.name}</div>
          <p className="text-gray-700 text-base mb-4">
            Сумма сделки: {deal.bet.price} BYN
          </p>
        </div>
        <div className="px-8 pb-6 flex justify-between items-center">
          <span className={`inline-block 
            ${deal.deal_status.status_name === 'CLOSED_SUCCESFULLY' 
              ? 'bg-green-500'
              : deal.deal_status.status_name === 'STARTED'
                 ? 'bg-yellow-500' 
                 : 'bg-red-500'} rounded-full px-3 py-1 text-md font-semibold text-white`
          }>
            {deal.deal_status.status_description}
          </span>
          <Link to={`/profile/deals/details/${deal.deal_id}`} className="text-blue-500 hover:text-blue-700 text-md font-semibold">Перейти к сделке</Link>
        </div>
      </div>
    );
}