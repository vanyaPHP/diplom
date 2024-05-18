export default function SingleBet({bet}) {
    return (
        <div key={bet.id} className="p-4 border border-gray-500 mb-4 rounded-lg hover:border-blue-500 hover:border-2">
            <p className="text-lg font-bold">Сумма: {bet.price} BYN</p>
            <p className="text-sm">Дата ставки: {bet.made_datetime}</p>
            <p className="text-sm">Статус: {bet.status}</p>
            <p className="text-sm">Дата принятия: {bet.accepted_datetime}</p>
            <p className="text-sm">Выиграла ли ставка: {bet.bet_won}</p>
        </div>
    );
}