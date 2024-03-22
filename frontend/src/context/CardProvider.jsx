import { createContext, useEffect, useState } from "react";

export const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [cardItems, setcardItems] = useState(
    localStorage.getItem("cardItems")
      ? JSON.parse(localStorage.getItem("cardItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cardItems", JSON.stringify(cardItems));
    console.log(cardItems)
  }, [cardItems]);

  function addToCard(cardItem) {
    //  setcardItems([...cardItems,product]);  1. yol

    setcardItems((prews) => [...prews, cardItem]);
  }
  function removerFromCard (itemId) {
    const filterdCardItems = cardItems.filter(item => item.id!==itemId)
    setcardItems(filterdCardItems)
  }
  return (
    <CardContext.Provider
      value={{
        addToCard,
        removerFromCard,
        cardItems,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
