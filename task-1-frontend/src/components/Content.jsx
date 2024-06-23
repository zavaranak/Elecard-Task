import {
  selectCards,
  fetchCardAction,
  removeAllCard,
} from "../slices/cardSlice";
import { useSelector, useDispatch } from "react-redux";
import Page from "./CardViewComponent/Page";
import { useState } from "react";
const Content = () => {
  const [view, setView] = useState("cards");
  const [currentPage, setPage] = useState(1);

  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const cardsLength = cards.length
  const lastPage = Math.round(cardsLength/8)

  return (
    <div className="body">
      <fieldset>
        <div>
          <input
            onClick={() => setView("cards")}
            type="radio"
            id="view1"
            name="view"
            value="cards"
          />
          <label htmlFor="view1">Cards View</label>
        </div>
        <div>
          <input
            onClick={() => setView("tree")}
            type="radio"
            id="view2"
            name="view"
            value="tree"
          />
          <label htmlFor="view2">Tree View</label>
        </div>
      </fieldset>
      <div>
        <button onClick={() => dispatch(fetchCardAction())}>
          Fetch Cards
        </button>
        <button onClick={() => {setPage(1);dispatch(removeAllCard())}}>
          Remove Cards
        </button>
      </div>

      {/* CardView */}
      {view === "cards" && <Page pageNumb={currentPage} />}
      {view === "cards" && currentPage < lastPage &&
        <button onClick={() => setPage((prev) => prev + 1)}>Next Page</button>
      }
      {view === "cards" && currentPage > 1 && 
        <button onClick={() => setPage((prev) => prev - 1)}>
          Previous Page
        </button>
      }
      {view === "cards" && cardsLength>0 && currentPage!==1 &&
        <button onClick={() => setPage(1)}>First Page</button>
      }
      {view === "cards" && cardsLength>0 && currentPage!==lastPage &&
        <button onClick={() => setPage(lastPage)}>
          Last Page
        </button>
      }
    </div>
  );
};

export default Content;
