import { createContext, useState } from "react";

export const CardContext = createContext();

const CardProvider =({children})=> {
    const [cardItems, setcardItems] = useState([]);

    function addToCard (cardItem) {
        //  setcardItems([...cardItems,product]);  1. yol
      
          setcardItems((prews)=> [...prews,cardItem])
        }
    return (
        <CardContext.Provider
        value={{
          addToCard,
          cardItems
        }}
        >
            {children}

        </CardContext.Provider>
    )
}

export default CardProvider