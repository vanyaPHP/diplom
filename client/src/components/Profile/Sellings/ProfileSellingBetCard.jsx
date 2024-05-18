export default function ProfileSellingBet({bet}) {
    return (
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg border border-gray-400 hover:border-2 hover:border-blue-500 overflow-hidden m-4">
            <div className="px-4 py-2">
                <h2 className="text-gray-800 font-bold text-xl mb-2">
                    Ставка от пользователя {bet.user.first_name} {bet.user.second_name}
                    </h2>
                <p className="text-gray-600 text-sm">Стоимость: {bet.price} BYN</p>
                <p className="text-gray-600 text-sm">Рейтинг покупателя: {bet.user.buyer_rating.rating}</p>
                <p className="text-gray-600 text-sm">Дата ставки: {bet.made_datetime}</p>
                <p className="text-gray-600 text-sm">Статус: {bet.status}</p>
            </div>
            {bet.status == "сделана" && (
                <div className="px-4 py-2 flex justify-between">
                    <button onClick={() => console.log('accept')}
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:shadow-xl"
                    >
                        Принять
                    </button>
                    <button onClick={() => console.log('decline')}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:shadow-xl"
                    >
                        Отклонить
                    </button>
                </div>
            )}
        </div>
    );
}