import React, { useEffect, useState } from "react";
import Coin from "./Coin";
import "./seatch.css";
import axios from 'axios'; 



const Search = () =>
{  
    const[coinsearch ,setcoinserach] =  useState("");
    const[coin,setcoin] = useState([]);

    useEffect(() =>{
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false")
        .then(res => {
            setcoin(res.data);
          })  
    },[])

    const handelsubmit  = (e) =>
    {
         setcoinserach(e.target.value);
    }

    const Filterdata = coin.filter(coins => 
        coins.name.toLowerCase().includes(coinsearch.toLowerCase())
    ) 
     
    return (
        <div className="coin-app">
             <div className="coin-search"> 
             <form action="">
              <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handelsubmit}/> 
          </form>

             </div>
             {Filterdata.map(coin=>{
        return(
          <Coin
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}
//           volume={coin.total_volume}
          />
        );
      })}

             
        </div>
    )
}

export default Search;