import { Link } from "react-router-dom";
import SingleBet from "./SingleBet";

export default function BetGroup({betGroup}) {
    return (
        <div key={betGroup.product.id} className="mb-8">
            <h2 className="text-xl font-bold mb-4">
                Ставки на товар <Link className="text-blue-600 hover:underline" to={`/product-details/${betGroup.product.id}`}>{betGroup.product.name}</Link>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {betGroup.bets.map((bet) => (
                    <SingleBet bet={bet}/>
                ))}
            </div>
        </div>
    );
}