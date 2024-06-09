import axios from "axios";
import Footer from "../../Helpers/Footer";
import DealCard from "./DealCard";
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../UserContext";


export default function ProfileDeals() {
    const {user, getUser} = useContext(UserContext);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
      if (!user) {
        getUser();
      } else {
        axios.get(`/deals/list-user-deals?user_id=${user.data.id}`)
          .then(res => {
              setDeals(res.data);
          })
      }
    }, [user]);


    return (
        <>
          {deals.length
            ?
              <>
                  <div className="flex flex-wrap justify-center mb-64">
                    {deals.map((deal, index) => (
                        <DealCard key={index} deal={deal} />
                    ))}
                  </div>
                  <Footer/>
              </>
            :
              <>
                <h1 className="text-center text-2xl mt-8 mb-96">Вы еще не проводили сделки</h1>
                <Footer/>
              </>
          }
        </>
    );
}