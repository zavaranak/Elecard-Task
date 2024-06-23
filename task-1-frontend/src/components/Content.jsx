import { fetchCardAction, removeAllCard } from "../slices/cardSlice";
import { useDispatch } from "react-redux";

import { useState } from "react";
import CardView from "./CardViewComponent/CardView";
const Content = () => {
  const [view, setView] = useState("cards");
  const dispatch = useDispatch();
  const cardRecover = () =>{
    localStorage.deletedCards = []
    dispatch(fetchCardAction())
  }
  return (
    <div className="body">
      <fieldset>
        <input
          onClick={() => setView("cards")}
          type="radio"
          id="view1"
          name="view"
          value="cards"
          checked
        />
        <label htmlFor="view1">Cards View</label>
        <input
          onClick={() => setView("tree")}
          type="radio"
          id="view2"
          name="view"
          value="tree"
        />
        <label htmlFor="view2">Tree View</label>
      </fieldset>
      <div>
        <button onClick={() => dispatch(fetchCardAction())}>Fetch Cards</button>
        <button onClick={() => dispatch(removeAllCard())}>Remove All Cards</button>
        {view === 'cards' && <button onClick={() => cardRecover()}>Recover Delelted Cards</button>}
      </div>
      {view === "cards" && <CardView />}
    </div>
  );
};

export default Content;
