import Footer from "../../Helpers/Footer";
import React, { useState } from 'react';


export default function ProfileDeals() {
    const deals = [
        { id: 1, title: 'Deal 1', description: 'Description for deal 1', price: '$10' },
        { id: 2, title: 'Deal 2', description: 'Description for deal 2', price: '$20' },
        { id: 3, title: 'Deal 3', description: 'Description for deal 3', price: '$30' },
      ];
      
    const creditCards = [
        { id: 1, cardNumber: '**** **** **** 1234', expiry: '12/23' },
        { id: 2, cardNumber: '**** **** **** 5678', expiry: '01/25' },
    ];

    const DealCard = ({ deal, onSelectCreditCard }) => {
        const [selectedCard, setSelectedCard] = useState(null);
      
        const handleCardSelect = (card) => {
          setSelectedCard(card.id);
          onSelectCreditCard(deal.id, card);
        };
      
        return (
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{deal.title}</h2>
            <p className="mb-4">{deal.description}</p>
            <p className="text-lg font-semibold mb-4">{deal.price}</p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Select Credit Card:</label>
              <div className="space-y-2">
                {creditCards.map((card) => (
                  <div
                    key={card.id}
                    className={`p-4 border rounded-lg cursor-pointer ${selectedCard === card.id ? 'border-blue-500' : 'border-gray-300'}`}
                    onClick={() => handleCardSelect(card)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{card.cardNumber}</span>
                      <span>{card.expiry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedCard && (
              <div className="mt-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded">Pay with Selected Card</button>
              </div>
            )}
          </div>
        );
    };

    const handleSelectCreditCard = (dealId, card) => {
        console.log(`Selected card for deal ${dealId}:`, card);
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Deals</h1>
                {deals.map((deal) => (
                    <DealCard key={deal.id} deal={deal} onSelectCreditCard={handleSelectCreditCard} />
                ))}
            </div>
            <Footer/>
        </>
    );
}