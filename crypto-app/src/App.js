import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./Component/Coin.js";
function App() {
  //We assign the state variable listOfCoins with an empty array
  //We use the function setListOfCoins to assign value to the state variable
  const [listOfCoins, setListOfCoins] = useState([]); //import useState
  const [searchWord, setSearchWord] = useState(""); //TO use as a string
  //useEffect - Inside which we define the function to store the results of the API call.
  //useEffect - This is called after the component is rendered.
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=10").then(
      (response) => {
        //response data is stored here.
        //Name of the array is coins.
        setListOfCoins(response.data.coins); //This function is used to assign value to the state variable
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });
  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={
            (event) => {
              setSearchWord(event.target.value);
            } //setting the value typed inside the input element
          }
        />
      </div>
      <div className="cryptoDisplay">
        {
          //We extract the individual data from the array
          filteredCoins.map((coin) => {
            //return <h1>{coin.name}</h1>; //Returning coin name ..You can check in the inspect element.
            //We can also pass to the component and return it from there
            return (
              <Coin
                //passing props
                name={coin.name}
                icon={coin.icon}
                price={coin.price}
                symbol={coin.symbol}
              />
            ); //To use we need to import - See above
          })
        }
      </div>
    </div>
  );
}

export default App;
